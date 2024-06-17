package com.ecommerce.webApi.Controller;

import com.ecommerce.webApi.Model.Products;
import com.ecommerce.webApi.Model.ProductCategory;
import com.ecommerce.webApi.Model.Users;
import com.ecommerce.webApi.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("product")
    public String addAProduct(@RequestBody Products product)
    {
        return  productService.addAProduct(product);
    }

    @PostMapping("products")
    public String addListOfProducts(@RequestBody List<Products> products) {return productService.addListOfProducts(products);}

    @PostMapping("update/product")
    public String updateProduct(@RequestBody Products product){
        return productService.updateProduct(product);
    }

    @GetMapping("product/{Id}")
    public Optional<Products> getProduct(@PathVariable Integer Id)
    {
        return productService.getProduct(Id);
    }

    @GetMapping("products")
    public List<Products> getProducts()
    {
        return productService.getProducts();
    }

    @GetMapping("products/{category}")
    public List<Products> getProductsByCategory(@PathVariable ProductCategory category)
    {
        return productService.getProductByCategory(category);
    }

    @DeleteMapping("product/{id}")
    public String deleteProductById(@PathVariable Integer id)
    {
        return productService.deleteProductById(id);
    }
}