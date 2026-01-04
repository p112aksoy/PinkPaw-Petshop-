import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Divider
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios ekledik

export default function ConfirmOrder() {
  const { items, clear } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // Loading durumu

  const totalPrice = items.reduce(
    (sum, it) => sum + it.price * (it.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Sipariş nesnesi
    const orderRequest = {
      customerName: fullName,
      phone,
      address,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1
      }))
    };

    try {
      setLoading(true);

      // Backend'e POST isteği
      const { data } = await axios.post(
        "http://localhost:8080/api/orders", // Backend URL
        orderRequest,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("ORDER SAVED:", data);

      // Sepeti temizle ve başarı sayfasına yönlendir
      clear();
      navigate("/order-success");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order could not be placed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Order Information
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* User Info */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextField
          label="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          label="Address"
          required
          multiline
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Payment Info */}
      <Typography variant="h6" fontWeight={600}>
        Payment Method
      </Typography>
      <Typography sx={{ mt: 1, mb: 2 }}>
        Cash on Delivery
      </Typography>

      {/* Total */}
      <Typography variant="h6" fontWeight={700}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>

      {/* Place Order Button */}
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 4,
          backgroundColor: "#ff69b4",
          "&:hover": { backgroundColor: "#ff4f9e" },
          fontWeight: 700,
          textTransform: "none"
        }}
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
      
    </Container>
    
  );
}
