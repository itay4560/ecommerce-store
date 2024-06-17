package com.ecommerce.webApi.Repository;

import com.ecommerce.webApi.Model.Orders;
import com.ecommerce.webApi.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepo extends JpaRepository<Orders, Integer> {
    List<Orders> findByFkUserId(Users fkUserId);
}
