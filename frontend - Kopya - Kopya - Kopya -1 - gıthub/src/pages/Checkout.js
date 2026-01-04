import React from "react";
import { useCart } from "../context/CartContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { resolveImageUrl } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function Checkout() {
  const { items, add, decrement, remove, clear } = useCart();
  const [openPayment, setOpenPayment] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [orderInfo, setOrderInfo] = React.useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (sum, it) => sum + it.price * (it.quantity || 1),
    0
  );

  
const handleConfirmOrder = async () => {
  // 1️⃣ VALIDATION
  if (!orderInfo.fullName || !orderInfo.phone || !orderInfo.address) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please fill in all required fields.",
      confirmButtonColor: "#da1893",
    });
    return;
  }

  // 2️⃣ REQUEST BODY
  const orderRequest = {
    customerName: orderInfo.fullName,
    phone: orderInfo.phone,
    address: orderInfo.address,
    note: orderInfo.note,
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity || 1,
    })),
  };

  try {
    // 3️⃣ API CALL
    const response = await axios.post(
      "http://localhost:8080/api/orders",
      orderRequest
    );

    // 🔥 BURASI KRİTİK
    if (response.status === 200 || response.status === 201) {
      setOpenPayment(false);

      Swal.fire({
        icon: "success",
        title: "Order Successful",
        text: "Your order has been placed successfully.",
        confirmButtonText: "OK",
        confirmButtonColor: "#da1893",
      }).then(() => {
        clear();
        navigate("/my-orders");
      });
    }

  } catch (error) {
    console.error("Order error:", error);

    Swal.fire({
      icon: "error",
      title: "Order Failed",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#da1893",
    });
  }
};


if (!items.length) {
  return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <ShoppingBagOutlinedIcon sx={{ fontSize: 70, color: "#ff69b4", mb: 2 }} />

      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#d30860ff", mb: 3 }}
      >
        Your cart is empty
      </Typography>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{
          px: 4,
          py: 1.4,
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 600,
          color: "#fff",
          background: "linear-gradient(45deg,#ff69b4,#ff85c1)",
          "&:hover": {
            background: "linear-gradient(45deg,#ff85c1,#ff69b4)",
          },
        }}
      >
        Go back to shopping
      </Button>
    </Container>
  );
}

  return (
    <Container sx={{ py: 4 }}>
      {/* HEADER + CLEAR CART */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#da1893ff" }}>
          Checkout
        </Typography>

   <Button
  variant="outlined"
  onClick={clear}
  sx={{
    borderRadius: 3,
    fontWeight: 600,
    color: "#da1893",
    borderColor: "#da1893",
    "&:hover": {
      borderColor: "#b51479",
      backgroundColor: "rgba(218, 24, 147, 0.08)",
    },
  }}
>
  Clear Cart
</Button>

      </Box>

      {/* CART ITEMS */}
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#fce3f3ff",
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <CardMedia
                component="img"
                image={resolveImageUrl(item.imageUrl)}
                alt={item.name}
                sx={{ height: 80 }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
              <Typography color="text.secondary">
                ${item.price.toFixed(2)} each
              </Typography>
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", gap: 1 }}>
              <IconButton onClick={() => decrement(item.id)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ minWidth: 25, textAlign: "center" }}>
                {item.quantity || 1}
              </Typography>
              <IconButton onClick={() => add(item)}>
                <AddIcon />
              </IconButton>
            </Grid>

            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 600 }}>
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <IconButton onClick={() => remove(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

{/* TOTAL + PROCEED */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 4,
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 800,
      color: "#da1893",
    }}
  >
    Total: ${totalPrice.toFixed(2)}
  </Typography>

  <Button
    variant="contained"
    size="large"
    sx={{
      background: "linear-gradient(135deg, #f596d3ff, #f9bae2)",
      fontWeight: 700,
      borderRadius: 3,
      px: 4,
      boxShadow: "0 8px 20px rgba(218, 24, 147, 0.25)",
      textTransform: "none",
      "&:hover": {
        background: "linear-gradient(135deg, #da1893, #f596d3ff)",
        boxShadow: "0 10px 25px rgba(218, 24, 147, 0.35)",
      },
    }}
    onClick={() => setOpenPayment(true)}
  >
    Proceed
  </Button>
</Box>


 {/* POPUP */}
<Dialog
  open={openPayment}
  onClose={() => setOpenPayment(false)}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: 4,
      background: "linear-gradient(135deg, #ffe6f2, #fff)",
      boxShadow: "0 25px 60px rgba(218, 24, 147, 0.25)",
    },
  }}
>
  {/* HEADER */}
  <DialogTitle
    sx={{
      fontWeight: 800,
      color: "#da1893",
      textAlign: "center",
      fontSize: 22,
      pb: 1,
    }}
  >
    Order Information
  </DialogTitle>

  {/* CONTENT */}
  <DialogContent
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2.5,
      pt: 2,
    }}
  >
    {/* FULL NAME */}
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
        Full Name
      </Typography>
      <TextField
        placeholder="Enter your full name"
        fullWidth
        value={orderInfo.fullName}
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, fullName: e.target.value })
        }
        InputProps={{
          sx: {
            borderRadius: 3,
            fontSize: 14,
            backgroundColor: "#fff",
          },
        }}
      />
    </Box>

    {/* PHONE */}
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
        Phone
      </Typography>
      <TextField
        placeholder="Enter phone number"
        fullWidth
        value={orderInfo.phone}
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, phone: e.target.value })
        }
        InputProps={{
          sx: {
            borderRadius: 3,
            fontSize: 14,
            backgroundColor: "#fff",
          },
        }}
      />
    </Box>

    {/* ADDRESS */}
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
        Address
      </Typography>
      <TextField
        placeholder="Enter delivery address"
        multiline
        rows={3}
        fullWidth
        value={orderInfo.address}
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, address: e.target.value })
        }
        InputProps={{
          sx: {
            borderRadius: 3,
            fontSize: 14,
            backgroundColor: "#fff",
          },
        }}
      />
    </Box>

    {/* NOTE */}
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
        Note (optional)
      </Typography>
      <TextField
        placeholder="Any extra notes?"
        multiline
        rows={2}
        fullWidth
        value={orderInfo.note}
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, note: e.target.value })
        }
        InputProps={{
          sx: {
            borderRadius: 3,
            fontSize: 14,
            backgroundColor: "#fff",
          },
        }}
      />
    </Box>

    {/* PAYMENT */}
    <Box
      sx={{
        mt: 1,
        p: 1.5,
        borderRadius: 3,
        backgroundColor: "rgba(218, 24, 147, 0.08)",
        textAlign: "center",
        fontWeight: 600,
        color: "#da1893",
      }}
    >
      Payment Method: <b>Cash on Delivery</b>
    </Box>
  </DialogContent>

  {/* ACTIONS */}
  <DialogActions
    sx={{
      px: 3,
      pb: 3,
      justifyContent: "space-between",
    }}
  >
    <Button
      onClick={() => setOpenPayment(false)}
      sx={{
        fontWeight: 600,
        color: "#da1893",
      }}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleConfirmOrder}
      sx={{
        backgroundColor: "#da1893",
        fontWeight: 700,
        borderRadius: 3,
        px: 4,
        "&:hover": {
          backgroundColor: "#b51479",
        },
      }}
    >
      Confirm Order
    </Button>
  </DialogActions>
</Dialog>
{/* SUCCESS POPUP */}
<Dialog
  open={openSuccess}
  onClose={() => setOpenSuccess(false)}
  maxWidth="xs"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      textAlign: "center",
      p: 3,
      background: "linear-gradient(135deg, #ffe6f2, #fff)",
      boxShadow: "0 25px 60px rgba(218, 24, 147, 0.3)",
    },
  }}
>
  <DialogTitle
    sx={{
      fontWeight: 800,
      color: "#da1893",
      fontSize: 24,
    }}
  >
     Order Created!
  </DialogTitle>

  <DialogContent sx={{ mt: 1 }}>
    <Typography sx={{ fontSize: 15, color: "#555" }}>
      Your order has been successfully placed.
      <br />
      We will contact you shortly for delivery.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(135deg, #da1893, #f596d3)",
        fontWeight: 700,
        borderRadius: 3,
        px: 5,
        "&:hover": {
          background: "linear-gradient(135deg, #b51479, #da1893)",
        },
      }}
      onClick={() => {
        setOpenSuccess(false);
        navigate("/my-orders");
      }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>

    </Container>
  );
  
}
