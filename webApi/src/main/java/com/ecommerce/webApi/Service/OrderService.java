package com.ecommerce.webApi.Service;


import com.ecommerce.webApi.Model.Orders;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Repository.IOrderRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    IOrderRepo iOrderRepo;

    public Optional<Orders> getOrderById(Integer id){
        return iOrderRepo.findById(id);
    }

    public String placeAnOrder(Orders order){
        iOrderRepo.save(order);
        return "Order Placed :) !";
    }

    public List<Orders> getAllOrders(){
        return (List<Orders>) iOrderRepo.findAll();
    }

    public List<Orders> getAllOrdersByUserId(Users user){
        return iOrderRepo.findByFkUserId(user);
    }

    public String deleteOrderById(Integer id){
        iOrderRepo.deleteById(id);
        return "Order Cancelled :( !";
    }

    public String deleteAllOrders(List<Orders> orders){
        iOrderRepo.deleteAll(orders);
        return "delete all orders :)";
    }
}