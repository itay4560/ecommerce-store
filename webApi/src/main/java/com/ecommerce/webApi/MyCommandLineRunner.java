package com.ecommerce.webApi;

import com.ecommerce.webApi.Model.*;
import com.ecommerce.webApi.Service.OrderService;
import com.ecommerce.webApi.Service.ProductService;
import com.ecommerce.webApi.Service.RolesService;
import com.ecommerce.webApi.Service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @Autowired
    private RolesService rolesService;
    @Autowired
    private OrderService orderService;

    @Override
    public void run(String... args) throws Exception {

        if(userService.getUsers().size() > 0){
            return;
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode("123456");

        // Roles
        Roles role = new Roles();
        role.setRoleName("Customer");
        rolesService.addRole(role);
        Roles role2 = new Roles();
        role2.setRoleName("Admin");
        rolesService.addRole(role2);

        //users
        Users user = new Users();
        user.setUserEmail("moty@email.com");

        user.setUserPassword(encryptedPassword);
        user.setRoleId(role);

        Users user2 = new Users();
        user2.setUserEmail("admin@email.com");
        user2.setUserPassword(encryptedPassword);
        user2.setRoleId(role2);

        Users user3 = new Users();
        user3.setUserEmail("eyal@email.com");
        user3.setUserPassword(encryptedPassword);
        List<Roles> rolesList =  rolesService.getRoles();
        user3.setRoleId(rolesList.get(0));

        List<Users> listUsers = new ArrayList<>();
        listUsers.add(user);
        listUsers.add(user2);
        listUsers.add(user3);
        userService.addListOfUsers(listUsers);


        // Products
        final String uri = "https://fakestoreapi.com/products";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(responseEntity.getBody());

        if (root.isArray()) {
            for (JsonNode jsonNode : root) {

                String title = jsonNode.get("title").asText();
                String description = jsonNode.get("description").asText();
                Double price = jsonNode.get("price").asDouble();
                String image = jsonNode.get("image").asText();
                String category = jsonNode.get("category").asText();

                Products product = new Products();
                product.setProducTitle(title);
                product.setProducDescription(description);
                product.setProducPrice(price);
                product.setProducImage(image);

                if(category.equals("men's clothing") ||  category.equals("women's clothing")){
                    product.setProductCategory(ProductCategory.CLOTHES);
                }

                if(category.equals("jewelery") ){
                    product.setProductCategory(ProductCategory.BEAUTY);
                }

                if(category.equals("electronics") ){
                    product.setProductCategory(ProductCategory.ELECTRONICS);
                }

                productService.addAProduct(product);
            }
        }
        List<Products> products =  productService.getProducts();

        //Orders
        Orders order = new Orders();
        order.setFkUserId(user);
        List<Products> listProducts = new ArrayList<>();
        listProducts.add(products.get(0));
        listProducts.add(products.get(1));
        listProducts.add(products.get(2));
        order.setProducts(listProducts);
        orderService.placeAnOrder(order);

        Orders order2 = new Orders();
        order2.setFkUserId(user3);
        List<Products> listProducts2 = new ArrayList<>();
        listProducts2.add(products.get(3));
        listProducts2.add(products.get(4));
        listProducts2.add(products.get(5));
        order2.setProducts(listProducts2);
        orderService.placeAnOrder(order2);
    }
}
