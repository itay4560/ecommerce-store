import { Box, Grid, Paper } from "@mui/material";
import { useShoppingStore } from "../../store/useShoppingStore";
import ProductCard from "../ProductCard";
import HeroSilder from "./HeroSilder/HeroSilder";

const HomePage = () => {
  const { products } = useShoppingStore();

  return (
    <>
      <Grid>
        <HeroSilder />
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        <h1 style={{ textAlign: "center" }} className="trending_heading">
          Trending Products
        </h1>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products &&
            products
              .slice(0, 10)
              .map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
