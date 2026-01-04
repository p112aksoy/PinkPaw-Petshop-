import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import api from "../../api/axios";
import { useCart } from "../../context/CartContext";
import placeholder from "../../assets/images/dog1.jpeg";

export default function DogAccessories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    api.get("/api/products", {
      params: { category: "dog", type: "accessories" }
    })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("DogAccessories error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dog Accessories
      </Typography>

      {loading && <Typography>Loading products...</Typography>}
      {!loading && products.length === 0 && (
        <Typography>No dog accessories found.</Typography>
      )}

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {products.map(product => (
          <Card key={product.id} sx={{ width: 260, display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="180"
              image={product.imageUrl ? `${BASE_URL}${product.imageUrl}` : placeholder}
              alt={product.name}
            />

            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Typography fontWeight={600} fontSize="0.85rem" noWrap>
                {product.name}
              </Typography>
              <Typography color="text.secondary" fontSize="0.75rem" noWrap>
                {product.description}
              </Typography>
              {product.details && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} fontSize="0.7rem" noWrap>
                  {product.details}
                </Typography>
              )}
              <Typography sx={{ mt: 1, fontWeight: 500 }} fontSize="0.8rem">
                ${product.price}
              </Typography>

              <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#FADADD",
                    color: "#5A3E36",
                    borderRadius: 1.5,
                    fontSize: "0.75rem",
                    py: 0.5,
                    "&:hover": {
                      backgroundColor: "#F7C6D1",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                    },
                    flexGrow: 1
                  }}
                  onClick={() => add(product)}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    py: 0.5,
                    flexGrow: 1
                  }}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
