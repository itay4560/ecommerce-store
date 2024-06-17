package com.ecommerce.webApi.config;

import com.ecommerce.webApi.config.auth.SecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class AuthConfig {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize

                        .requestMatchers(HttpMethod.GET, "/swagger-ui/*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/swagger-ui/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api-docs/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api-docs").permitAll()
                        .requestMatchers(HttpMethod.GET, "/product/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/products").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user").permitAll()

                        .requestMatchers(HttpMethod.GET, "/order/*").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/orders/user").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "orders/save").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.DELETE, "/order/*").hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.GET, "/user/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/orders/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/product/*").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/update/user").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/update/product").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/user/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/product/*").hasRole("ADMIN")

                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}