import React, { useEffect, useState, useRef } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getAllProducts } from "../services/productService";

const DARK_PINK = "#C2185B";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const campaignRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    getAllProducts()
      .then((data) => {
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const handleScrollToCampaign = () => {
    campaignRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(180deg, #fde4ef 0%, #ffffff 85%)",
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 14 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: DARK_PINK }}>
                PinkPaw
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, color: "#444" }}>
                Everything your sweet friends need — food, toys and accessories.
              </Typography>

              <Button
                variant="contained"
                onClick={handleScrollToCampaign}
                sx={{
                  backgroundColor: DARK_PINK,
                  px: 4,
                  py: 1.2,
                  borderRadius: "24px",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#a3154c" },
                }}
              >
                Shop Now
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/HeroPicture.png"
                alt="Hero"
                sx={{ width: "100%", borderRadius: "18px" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= WAVE ================= */}
      <Box sx={{ mt: -1 }}>
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100px", display: "block" }}
        >
          <path
            d="M0,40 C240,100 480,0 720,30 960,60 1200,20 1440,40 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </Box>

      {/* ================= SPECIAL OFFERS ================= */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #ffffff 0%, #fdeff6 100%)",
          py: 8,
        }}
      >
        <Container>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 5,
              color: DARK_PINK,
              textAlign: "center",
            }}
          >
            Special Offers
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Cat Products",
                text: "Special discounts on cat food and toys.",
                img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
              },
              {
                title: "Dog Products",
                text: "Campaigns for dog accessories and food.",
                img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
              },
              {
                title: "Accessories",
                text: "Bowls, collars and daily pet accessories.",
                img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "20px",
                    p: 3,
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: "14px",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="#555">
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= CAMPAIGN PRODUCTS ================= */}
      <Container ref={campaignRef} sx={{ py: 8, position: "relative" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: DARK_PINK,
            mb: 4,
            textAlign: "center",
          }}
        >
          Campaign Products
        </Typography>

        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            top: "55%",
            left: -10,
            backgroundColor: "#fff",
            boxShadow: 2,
            zIndex: 2,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            top: "55%",
            right: -10,
            backgroundColor: "#fff",
            boxShadow: 2,
            zIndex: 2,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <Box
          ref={sliderRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {[
            { title: "Cat Food", img: "/images/cat1.jpeg" },
            { title: "Cat Food", img: "/images/cat2.jpeg" },
            { title: "Dog Food", img: "/images/dog1.jpeg" },
            { title: "Dog Food", img: "/images/dog2.jpeg" },
          ].map((item, index) => (
            <Box key={index} sx={{ minWidth: 260 }}>
              {/* REAL FRAME */}
              <Box
                sx={{
                  position: "relative",
                  border: "2px solid #f3ecefff",
                  borderRadius: "18px",
                  padding: "12px",
                  backgroundColor: "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    borderColor:" #feeff5ff",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {/* DISCOUNT */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    backgroundColor: DARK_PINK,
                    color: "#fff",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: 12,
                    fontWeight: 600,
                    zIndex: 2,
                  }}
                >
                  DISCOUNT
                </Box>

                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "12px",
                    mb: 1.5,
                  }}
                />

                <Typography align="center" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>

                <Typography
                  align="center"
                  sx={{ fontSize: 13, color: "#777", fontStyle: "italic" }}
                >
                  Limited time offer
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
