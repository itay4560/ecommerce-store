package com.ecommerce.webApi.Service;

import com.ecommerce.webApi.Model.Roles;
import com.ecommerce.webApi.Repository.IRolesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {

    @Autowired
    IRolesRepo iRolesRepo;

    public String addRole(Roles roles){
        iRolesRepo.save(roles);
        return "Role added :) !";
    }

    public List<Roles> getRoles(){
        return (List<Roles>) iRolesRepo.findAll();
    }
}
