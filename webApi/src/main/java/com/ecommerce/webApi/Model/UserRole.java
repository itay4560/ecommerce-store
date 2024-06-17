package com.ecommerce.webApi.Model;

public enum UserRole {
  ADMIN("Admin"),
  CUSTOMER("Customer");

  private String role;

  UserRole(String role) {
    this.role = role;
  }

  public String getValue() {
    return role;
  }
}
