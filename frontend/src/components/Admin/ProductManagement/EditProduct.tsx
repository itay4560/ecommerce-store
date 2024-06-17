import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import BackButton from "../../BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Product } from "../../../models/Product";
import ProductCategory from "../../../models/ProductCategory";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();
  const categoriesKeys = Object.values(ProductCategory);
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        const _product = await agent.Products.getProductById(id);
        setProduct(_product);
        setCategory(_product["productCategory"]);
      };
      fetch();
    }
  }, [id]);

  async function submitForm(data: FieldValues) {
    if (product) {
      try {
        data["productCategory"] = category;
        data["productId"] = product["productId"];
        data["producPrice"] = +data["producPrice"];
        const reponse = await agent.AdminActions.updateProduct(data as Product);
        if (reponse) {
          toast.success("product product successfully");
          navigate("/admin/products");
        } else {
          toast.error("Update product Failed. Please try again");
        }
      } catch (error) {
        console.log("Error Update product:", error);
        toast.error("Update product Failed. Please try again");
      }
    }
  }

  return (
    <>
      <Box
        sx={{
          marginTop: "100px",
        }}
      >
        <BackButton />
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h2">Edit Product</Typography>
        </Box>
        {product && (
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="producTitle"
              label="Title"
              autoFocus
              {...register("producTitle", { required: "Title is required" })}
              error={!!errors.producTitle}
              defaultValue={product["producTitle"]}
              helperText={errors?.producTitle?.message as string}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="producDescription"
              label="Description"
              {...register("producDescription", {
                required: "Description is required",
              })}
              error={!!errors.producTitle}
              defaultValue={product["producDescription"]}
              helperText={errors?.producDescription?.message as string}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="producPrice"
              label="Price"
              {...register("producPrice", {
                required: "Price is required",
              })}
              error={!!errors.producTitle}
              defaultValue={product["producPrice"]}
              helperText={errors?.producPrice?.message as string}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="producImage"
              label="Image"
              {...register("producImage", {
                required: "Image is required",
              })}
              error={!!errors.producTitle}
              defaultValue={product["producImage"]}
              helperText={errors?.producImage?.message as string}
            />

            <FormControl fullWidth sx={{ marginTop: "25px" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>

              <Select
                value={category}
                label="Category"
                onChange={(event: SelectChangeEvent) =>
                  setCategory(event.target.value as string)
                }
              >
                {categoriesKeys.length > 0 &&
                  categoriesKeys.map((cat: string, index: number) => {
                    return (
                      <MenuItem key={index} value={cat}>
                        {cat.replaceAll("_", " ")}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </LoadingButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default EditProduct;
