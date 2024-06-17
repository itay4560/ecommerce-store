package com.ecommerce.webApi.Controller;

import com.ecommerce.webApi.Model.Orders;
import com.ecommerce.webApi.Model.Products;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Service.OrderService;
import com.ecommerce.webApi.config.auth.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    //Post
    @PostMapping("orders/save")
    public String placeAnOrder(@RequestBody List<Products> products)
    {
        Orders orders = new Orders();
        orders.setProducts(products);
        var auth = SecurityContextHolder.getContext().getAuthentication();
        Users user = (Users) auth.getPrincipal();
        orders.setFkUserId(user);
        return orderService.placeAnOrder(orders);
    }

    @GetMapping("orders")
    public List<Orders> getAllOrders()
    {
        return orderService.getAllOrders();
    }

    @GetMapping("order/{id}")
    public Optional<Orders> getOrderById(@PathVariable Integer id)
    {
        return orderService.getOrderById(id);
    }

    @GetMapping("orders/user")
    public List<Orders> getOrderByUserId()
    {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        Users user = (Users) auth.getPrincipal();
        return orderService.getAllOrdersByUserId(user);
    }

    @DeleteMapping("order/{id}")
    public String deleteOrderById(@PathVariable Integer id)
    {
        return orderService.deleteOrderById(id);
    }
}
