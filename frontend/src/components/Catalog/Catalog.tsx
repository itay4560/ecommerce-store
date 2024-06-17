import React from "react";
import ProductsList from "../ProductsList";

const Catalog = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="trending_heading">
        All Products
      </h1>
      <ProductsList />
    </div>
  );
};

export default Catalog;
