package com.ecommerce.webApi.Service;

import com.ecommerce.webApi.Model.Orders;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Repository.IOrderRepo;
import com.ecommerce.webApi.Repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    IUserRepo iUserRepo;

    @Autowired
    IOrderRepo iOrderRepo;

    @Autowired
    private OrderService orderService;

    public String addUser(Users user){
        iUserRepo.save(user);

        return "User added :) !";
    }

    public List<Users> getUsers(){
        return  (List<Users>)  iUserRepo.findAll();
    }

    public Optional<Users> getUser(Integer id){
        return iUserRepo.findById(id);
    }

    public String addListOfUsers(List<Users> users){
        iUserRepo.saveAll(users);

        return "Users are Added :) !";
    }

    public String updateUser(Users user){
        iUserRepo.save(user);
        return "User updated :) !";
    }

    public String deleteUserById(Integer id){
        Optional<Users> isUser = this.getUser(id);
        if(isUser.isPresent()){
            Users user = isUser.get();
            List<Orders> orders =  iOrderRepo.findByFkUserId(user);
            orderService.deleteAllOrders(orders);
            iUserRepo.deleteById(id);
        }
        return "User Removed !";
    }
}