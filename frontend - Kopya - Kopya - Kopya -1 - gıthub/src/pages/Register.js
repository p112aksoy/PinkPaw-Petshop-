import React, { useState } from "react";
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

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/api/auth/register", form);
      setError(false);
      setMessage("Account created successfully 🎉");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(true);
      setMessage("Registration failed ❌");
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
              Create Account
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
            >
              Join PinkPaw and spoil your pet 🐾
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
                label="Username"
                name="username"
                margin="normal"
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
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
              >
                REGISTER
              </Button>
            </form>

            <Typography
              variant="body2"
              sx={{ mt: 3, textAlign: "center" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#e91e63",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                Login
              </Link>
            </Typography>
          </Paper>
        </Slide>
      </Box>
    </Fade>
  );
}
