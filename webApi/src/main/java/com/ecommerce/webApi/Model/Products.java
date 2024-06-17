package com.ecommerce.webApi.Model;

import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    private String producTitle;

    @Column(length = 3000)
    private String producDescription;

    private String producImage;
    private Double producPrice;

    @Enumerated(value = EnumType.STRING)
    private ProductCategory productCategory;
}
