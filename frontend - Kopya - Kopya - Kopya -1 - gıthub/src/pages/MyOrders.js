import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: "#da1893" }}>
         My Orders
      </Typography>

      {orders.map((order) => (
        <Card
          key={order.orderId}
          sx={{ mb: 4, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
        >
          <CardContent>
            {/* HEADER */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography fontWeight={700}>Order #{order.orderId}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.orderDate).toLocaleString()}
                </Typography>
              </Box>

              <Chip
                label={order.status}
                sx={{
                  backgroundColor: order.status === "DELIVERED" ? "#c8f7dc" : "#fde2f1",
                  color: "#000",
                  fontWeight: 600,
                }}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* ITEMS */}
            {order.items.map((item) => (
              <Box key={item.productId} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>{item.productName}</Typography>
                <Typography fontWeight={600}>× {item.quantity}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* TOTAL */}
            <Typography sx={{ textAlign: "right", fontWeight: 700 }}>
              Total: ${order.totalPrice.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
