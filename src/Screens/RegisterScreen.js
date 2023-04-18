import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchema } from "../schema/registrationSchema";
import { postRegister } from "../services/MyService";
import { toast } from "react-toastify";

const initialValuesRegistration = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  con_password: "",
};

const theme = createTheme();

export default function RegisterScreen() {
  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: initialValuesRegistration,
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [state, setState] = useState({ errMsg: "", succMsg: "" });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
    };
    console.log("formData", formData);
    postRegister(formData).then((res) => {
      console.log("res", res);
      if (res.data.err === 0) {
        setState({ ...state, succMsg: res.data.msg });
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
      if (res.data.err === "1") {
        setState({ ...state, errMsg: res.data.msg });
        toast.error(res.data.msg);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  color="secondary"
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errors.firstName && touched.firstName ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.firstName}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  color="secondary"
                  name="lastName"
                  autoComplete="family-name"
                />
                {errors.lastName && touched.lastName ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.lastName}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email Address"
                  name="email"
                  color="secondary"
                  autoComplete="email"
                />
                {errors.email && touched.email ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.email}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Contact Number"
                  name="phone"
                  color="secondary"
                  autoComplete="phone"
                />
                {errors.phone && touched.phone ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.phone}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  color="secondary"
                  autoComplete="new-password"
                />
                {errors.password && touched.password ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.password}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.con_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="con_password"
                  label="Confirm Password"
                  type="password"
                  id="con_password"
                  color="secondary"
                  autoComplete="con_password"
                />
                {errors.con_password && touched.con_password ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.con_password}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
