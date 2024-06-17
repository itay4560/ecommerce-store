import React, { useCallback } from "react";
import { Product } from "../models/Product";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PerfumeIcon from "/Image/products/perfume.svg";
import LaundryIcon from "/Image/products/laundry.png";
import DeviceIcon from "/Image/products/device.png";
import ProductCategory from "../models/ProductCategory";
import { ShoppingCart } from "@mui/icons-material";
import { useShoppingStore } from "../store/useShoppingStore";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const { cart } = useShoppingStore();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const isExsitsInCart = useCallback(() => {
    for (const item of cart) {
      if (item.productId === product.productId) {
        return true;
      }
    }
    return false;
  }, [cart]);

  return (
    <Box sx={{ width: "300px", height: "350px", marginBottom: "15px" }}>
      <Card sx={{ height: "350px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {product.producTitle.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.producTitle}
          titleTypographyProps={{
            sx: {
              fontWeight: "bold",
              color: "primary.main",
              display: "-webkit-box",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
        <CardMedia
          sx={{ height: 140, backgroundSize: "contain" }}
          image={product.producImage}
          title={product.producTitle}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom color="secondary" variant="h5">
              {formatPrice(product.producPrice)}
            </Typography>

            {(product.productCategory as ProductCategory).includes(
              ProductCategory.BEAUTY
            ) && <img width={40} height={40} src={PerfumeIcon} />}

            {(product.productCategory as ProductCategory).includes(
              ProductCategory.CLOTHES
            ) && <img width={40} height={40} src={LaundryIcon} />}

            {(product.productCategory as ProductCategory).includes(
              ProductCategory.ELECTRONICS
            ) && <img width={40} height={40} src={DeviceIcon} />}
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: ".9",
            }}
          >
            <Box>
              <Button
                component={Link}
                to={`/product/${product.productId}`}
                size="small"
              >
                View
              </Button>
            </Box>
            {isExsitsInCart() && (
              <Box sx={{ color: "#1E4E66" }}>
                <ShoppingCart />
              </Box>
            )}
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
