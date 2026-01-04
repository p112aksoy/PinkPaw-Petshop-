import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

export default function Footer() {
  const darkPink = "#C71585";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fce3f3ff",
        color: darkPink,
        mt: 4,
        py: 3, // 🔴 footer yüksekliğini asıl küçülten kısım
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          
          {/* LEFT - BRAND */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: darkPink }}
            >
              PinkPaw
            </Typography>

            <Typography
              variant="body2"
              sx={{ opacity: 0.9, mt: 0.5 }}
            >
              A friendly e-commerce platform for pet lovers.
            </Typography>
          </Grid>

          {/* RIGHT - SOCIAL */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              gap: 1,
            }}
          >
            <IconButton sx={{ color: darkPink }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: darkPink }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: darkPink }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: darkPink }}>
              <PinterestIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* COPYRIGHT */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 PinkPaw — All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
