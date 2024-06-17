package com.ecommerce.webApi.Repository;


import com.ecommerce.webApi.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends JpaRepository<Users, Integer> {
    UserDetails findByUserEmail(String email);
}
