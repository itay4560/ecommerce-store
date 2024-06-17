package com.ecommerce.webApi.Service;

import com.ecommerce.webApi.Model.Orders;
import com.ecommerce.webApi.Model.Products;
import com.ecommerce.webApi.Model.ProductCategory;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Repository.IOrderRepo;
import com.ecommerce.webApi.Repository.IProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    IProductRepo iProductRepo;

    @Autowired
    IOrderRepo iOrderRepo;

    public String addAProduct(Products product){
        iProductRepo.save(product);
        return "Product added :) !";
    }

    public List<Products> getProducts(){
        return (List<Products>) iProductRepo.findAll();
    }

    public Optional<Products> getProduct(Integer id){
        return iProductRepo.findById(id);
    }

    public List<Products> getProductByCategory(ProductCategory category){
        return iProductRepo.findByProductCategory(category);
    }

    public String updateProduct(Products product){
        iProductRepo.save(product);
        return "Product updated :) !";
    }

    public String addListOfProducts(List<Products> products){
        iProductRepo.saveAll(products);
        return "Products are added :) !";
    }

    public String deleteProductById(Integer id){
        List<Orders> orders =  iOrderRepo.findAll();

        // Loop over the list
        for (Orders item : orders) {
            boolean isExsits = false;
            List<Products> products = item.getProducts();
            for (Products product : products) {
                if(product.getProductId().equals(id)){
                    isExsits = true;
                }
            }
            if(isExsits){
                iOrderRepo.delete(item);
            }
        }

        iProductRepo.deleteById(id);
        return "Product removed !";
    }
}
