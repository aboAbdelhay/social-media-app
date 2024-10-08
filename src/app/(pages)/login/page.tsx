"use client";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { LoginData } from "@/interfaces/login";
import { useDispatch, useSelector } from "react-redux";
import { storeDispath, storeState } from "@/redux/store";
import { login } from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialValues: LoginData = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch<storeDispath>();
  const { token, isLoading, error } = useSelector(
    (state: storeState) => state.authReducer
  );
  const { push } = useRouter();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await dispatch(login(values));
      if (localStorage.getItem("token")) {
        push("/");
      } else {
        toast.error(error);
      }
    },
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      push("/");
    }
  }, []);
  return (
    <>
      <Container maxWidth="md" sx={{}}>
        <Paper elevation={10} sx={{ p: 3, m: 3 }}>
          <h1
            style={{
              marginBottom: "30px",
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Login
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
            />
            <FormControl sx={{}} variant="outlined">
              <InputLabel htmlFor="password"> Password</InputLabel>
              <OutlinedInput
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {isLoading ? (
              <Button type="button" variant="contained" color="primary">
                <CircularProgress sx={{ color: "#fff" }} />
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            )}
          </form>
        </Paper>
      </Container>
    </>
  );
}
