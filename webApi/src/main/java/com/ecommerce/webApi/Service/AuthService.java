package com.ecommerce.webApi.Service;


import com.ecommerce.webApi.Dto.SignUpDto;
import com.ecommerce.webApi.Exceptions.InvalidJwtException;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    IUserRepo repository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserDetails user = repository.findByUserEmail(email);
        return user;
    }

    public UserDetails signUp(SignUpDto data) throws InvalidJwtException {

        if (repository.findByUserEmail(data.email()) != null) {
            throw new InvalidJwtException("email already exists");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Users newUser = new Users(data.email(), encryptedPassword, data.role());

        return repository.save(newUser);
    }
}