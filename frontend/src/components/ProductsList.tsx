import React, { useEffect, useState } from "react";
import { useShoppingStore } from "../store/useShoppingStore";
import { Box, FormControl, FormControlLabel } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductCategory from "../models/ProductCategory";
import { Product } from "../models/Product";
import Checkbox from "@mui/material/Checkbox";

const ProductsList = () => {
  const { products } = useShoppingStore();
  const filterskeys = Object.values(ProductCategory);
  const [filteredList, setFilteredList] = useState(
    Object.assign(
      {},
      ...filterskeys.map((fk: string) => {
        return { [fk]: false };
      })
    )
  );

  const [productsFilterd, setProductsFilterd] = useState<Product[]>([
    ...products,
  ]);

  const FilterCheckbox = (filterKey: string) => {
    return (
      <Checkbox
        onChange={(event) => onFilterChange(event, filterKey)}
        checked={filteredList[filterKey]}
        inputProps={{ "aria-label": "controlled" }}
      />
    );
  };

  const filterProducts = () => {
    const keys = Object.keys(filteredList);
    const hasFilters = keys.filter(function (key) {
      return filteredList[key];
    });

    if (hasFilters.length === 0) {
      setProductsFilterd([...products]);
      return;
    }

    const filtered = [];
    for (const product of products) {
      if (filteredList[product.productCategory]) {
        filtered.push(product);
      }
    }
    setProductsFilterd(filtered);
  };

  const onFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterKey: string
  ) => {
    const value = event.target.checked;
    setFilteredList({ ...filteredList, [filterKey]: value });
  };

  useEffect(() => {
    if (filteredList) {
      filterProducts();
    }
  }, [filteredList]);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "15%",
          border: "1px solid ",
          position: "sticky",
          padding: "20px",
          top: 0,
          borderRadius: "20px",
        }}
      >
        <h2 style={{}}>Filters</h2>
        {filterskeys.map((fk: string) => {
          return (
            <Box key={fk}>
              <FormControl component="fieldset">
                <FormControlLabel
                  value="end"
                  control={FilterCheckbox(fk)}
                  label={fk.replaceAll("_", " ")}
                  labelPlacement="end"
                />
              </FormControl>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          overflow: "scroll",
          width: "85%",
          height: "80vh",
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products &&
          productsFilterd.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
      </Box>
    </Box>
  );
};

export default ProductsList;
