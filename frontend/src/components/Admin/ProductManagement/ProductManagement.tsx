import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAdminShoppingStore } from "../../../store/useAdminShoppingStore";
import { Product } from "../../../models/Product";
import AddIcon from "@mui/icons-material/Add";
import { TableProucts } from "../../Tables/TableProucts";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const { data } = useAdminShoppingStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data.products) {
      const _products = [...data.products].map((item, index) => {
        return {
          id: index,
          ...item,
        };
      });
      setProducts(_products);
    }
  }, [data.products]);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        justifyContent: "center",
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h2">System Products</Typography>
      </Box>

      <Box>
        <Button
          onClick={() => navigate("/admin/product/new")}
          sx={{ marginBottom: "10px" }}
          variant="contained"
        >
          <AddIcon sx={{ fontSize: "1.5rem" }} />
          <Typography>Add Product</Typography>
        </Button>
      </Box>

      {products && products.length == 0 && (
        <Typography variant="h4">No products yet</Typography>
      )}

      {products && products.length > 0 && <TableProucts />}
    </Box>
  );
};

export default ProductManagement;
