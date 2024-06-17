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

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const [role, setRole] = useState("");

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        const _user = await agent.UserActions.getUser(id);
        setUser(_user);
        setRole(_user["roleId"]["roleId"]);
      };
      fetch();
    }
  }, [id]);

  async function submitForm(data: FieldValues) {
    if (user) {
      try {
        const _role = {
          roleId: role,
          roleName: +role === 1 ? "Customer" : "Admin",
        };

        const _user = {
          userId: user["userId"],
          userEmail: data["email"],
          roleId: _role,
          userPassword: user["userPassword"],
        };

        const reponse = await agent.AdminActions.updateUser(_user);

        if (reponse) {
          toast.success("Update user successfully");
          navigate("/admin/users");
        } else {
          toast.error("Update user Failed. Please try again");
        }
      } catch (error) {
        console.log("Error Update user:", error);
        toast.error("Update user Failed. Please try again");
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
          <Typography variant="h2">Edit User</Typography>
        </Box>
        {user && (
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
              id="email"
              label="Email"
              type="email"
              autoFocus
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              defaultValue={user["userEmail"]}
              helperText={errors?.email?.message as string}
            />

            <FormControl fullWidth sx={{ marginTop: "25px" }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>

              <Select
                value={role}
                label="Role"
                onChange={(event: SelectChangeEvent) =>
                  setRole(event.target.value as string)
                }
              >
                <MenuItem value={1}>Customer</MenuItem>
                <MenuItem value={2}>Admin</MenuItem>
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

export default EditUser;
