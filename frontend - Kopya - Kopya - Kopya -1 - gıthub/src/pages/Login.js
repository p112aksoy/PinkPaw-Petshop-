import React, { useState } from "react";
import { useUser } from "../context/UserContext";

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Fade,
  Slide,
  Grow,
  Paper
} from "@mui/material";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/api/auth/login", form);
      const res = await api.post("/api/auth/login", form);
      login(res.data); // 👈 KULLANICIYI SAKLA

      
      setError(false);
      setMessage("Welcome back ");

      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError(true);
      setMessage("Wrong email or password");
    }
  };

  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Slide direction="up" in timeout={600}>
          <Paper
            elevation={8}
            sx={{
              width: 420,
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(180deg, #fff, #fff5f7)"
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: 700,
                textAlign: "center",
                color: "#e91e63"
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
            >
              Login to continue shopping for your pet 
            </Typography>

            {message && (
              <Grow in>
                <Alert severity={error ? "error" : "success"} sx={{ mb: 2 }}>
                  {message}
                </Alert>
              </Grow>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.4,
                  borderRadius: 3,
                  fontWeight: 700,
                  background:
                    "linear-gradient(90deg, #ff8a9d, #e91e63)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #e91e63, #d81b60)",
                    transform: "translateY(-2px)"
                  }
                }}
                variant="contained"
              >
                LOGIN
              </Button>
            </form>

            <Typography
              variant="body2"
              sx={{ mt: 3, textAlign: "center" }}
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#e91e63",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                Create account
              </Link>
            </Typography>
          </Paper>
        </Slide>
      </Box>
    </Fade>
  );
}
