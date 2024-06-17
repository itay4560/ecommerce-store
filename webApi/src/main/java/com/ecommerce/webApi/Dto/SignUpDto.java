package com.ecommerce.webApi.Dto;

import com.ecommerce.webApi.Model.Roles;

public record SignUpDto(
        String email,
        String password,
        Roles role) {
}
