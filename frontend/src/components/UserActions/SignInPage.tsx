import { LoadingButton } from "@mui/lab";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useShoppingStore } from "../../store/useShoppingStore";
import agent from "../../api/agent";

const SignInPage = () => {
  const { user, setUser } = useShoppingStore();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      const reponse = await agent.UserActions.login(data);
      const _token = reponse["accessToken"];
      if (_token && _token.length > 0) {
        setUser({
          email: data["email"],
          token: _token,
          isAdmin: reponse["isAdmin"],
        });
        toast.success("Sign in successfully");
        navigate(location.state?.from || "/");
      } else {
        toast.error("Sign in Failed. Please try again");
      }
    } catch (error) {
      console.log("Error signing in:", error);
      toast.error("Sign in Failed. Please try again");
    }
  }

  if (user) {
    navigate(location.state?.from || "/");
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "600px" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            autoFocus
            {...register("email", { required: "Email is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/register" content="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
