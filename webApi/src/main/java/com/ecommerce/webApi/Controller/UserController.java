package com.ecommerce.webApi.Controller;

import com.ecommerce.webApi.Model.Roles;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Service.RolesService;
import com.ecommerce.webApi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    RolesService rolesService;

    //post
    @PostMapping("user")
    public String addUser(@RequestBody Users user){
        List<Roles> rolesList =  rolesService.getRoles();
        user.setRoleId(rolesList.get(0));
        String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setUserPassword(encryptedPassword);
        return userService.addUser(user);
    }

    @PostMapping("users")
    public String addListOfUsers(@RequestBody List<Users> users){
        return userService.addListOfUsers(users);
    }

    @PostMapping("update/user")
    public String updateUser(@RequestBody Users user){
        return userService.updateUser(user);
    }

    //get
    @GetMapping("user/{Id}")
    public Optional<Users> getUser(@PathVariable Integer Id){
        return userService.getUser(Id);
    }

    @GetMapping("users")
    public List<Users> getProducts(){
        return userService.getUsers();
    }

    @DeleteMapping("user/{id}")
    public String deleteById(@PathVariable Integer id){
        return userService.deleteUserById(id);
    }
}