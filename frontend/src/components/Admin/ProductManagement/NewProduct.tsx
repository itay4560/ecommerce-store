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

const NewProduct = () => {
  const navigate = useNavigate();
  const categoriesKeys = Object.values(ProductCategory);
  const [category, setCategory] = useState(categoriesKeys[0]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      data["productCategory"] = category;
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
            Add
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default NewProduct;
