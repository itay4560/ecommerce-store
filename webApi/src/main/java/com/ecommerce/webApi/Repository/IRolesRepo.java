package com.ecommerce.webApi.Repository;

import com.ecommerce.webApi.Model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRolesRepo extends JpaRepository<Roles, Integer>{
}
