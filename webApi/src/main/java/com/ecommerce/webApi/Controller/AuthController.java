package com.ecommerce.webApi.Controller;


import com.ecommerce.webApi.Dto.JwtDto;
import com.ecommerce.webApi.Dto.SignInDto;
import com.ecommerce.webApi.Dto.SignUpDto;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Service.AuthService;
import com.ecommerce.webApi.config.auth.TokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping()
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService service;
    @Autowired
    private TokenProvider tokenService;

    @PostMapping("auth/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDto data) {
        service.signUp(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("auth/signin")
    public ResponseEntity<Object> signIn(@RequestBody @Valid SignInDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authUser = authenticationManager.authenticate(usernamePassword);
        var accessToken = tokenService.generateAccessToken((Users) authUser.getPrincipal());
        String roleName = ((Users) authUser.getPrincipal()).getRoleId().getRoleName();
        Boolean isAdmin = roleName != null && roleName.equals("Admin");
        String token = new JwtDto(accessToken).accessToken();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("accessToken", token);
        map.put("isAdmin", isAdmin);
        return new ResponseEntity<Object>(map,HttpStatus.OK );
    }
}