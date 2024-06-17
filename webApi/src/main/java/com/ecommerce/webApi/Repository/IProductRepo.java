package com.ecommerce.webApi.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.webApi.Model.Products;
import com.ecommerce.webApi.Model.ProductCategory;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IProductRepo extends JpaRepository<Products, Integer> {
    List<Products> findByProductCategory(ProductCategory category);
}