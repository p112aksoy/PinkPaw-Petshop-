import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // ❗ render sırasında navigate çağırma → useEffect
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: 3,
        mt: "80px",          // 👈 HEADER ALTINA İTTİK
        minHeight: "70vh",   // 👈 Sayfa nefes alsın
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "#e91e63",
        }}
      >
        My Profile
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 480,
          backgroundColor: "#fffafb",
        }}
      >
        <Typography sx={{ mb: 2 }}>
          <strong>Username:</strong>{" "}
          {user.username || user.name}
        </Typography>

        <Typography sx={{ mb: 3 }}>
          <strong>Email:</strong> {user.email}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            px: 4,
            background:
              "linear-gradient(90deg, #ff8a9d, #e91e63)",
            "&:hover": {
              background:
                "linear-gradient(90deg, #e91e63, #d81b60)",
            },
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
