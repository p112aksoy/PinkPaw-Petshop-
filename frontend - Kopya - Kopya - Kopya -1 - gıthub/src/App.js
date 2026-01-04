import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";

import CatFood from "./pages/cat/CatFood";
import CatAccessories from "./pages/cat/CatAccessories";
import DogFood from "./pages/dog/DogFood";
import DogAccessories from "./pages/dog/DogAccessories";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import ConfirmOrder from "./pages/ConfirmOrder";
import MyOrders from "./pages/MyOrders";

import { Box } from "@mui/material";
import "./App.css";

// Header yüksekliğin (Header Toolbar minHeight = 72 yaptık)
const HEADER_HEIGHT = 72;

function App() {
  return (
    <UserProvider>
      <CartProvider>
        {/* 🌸 GLOBAL BACKGROUND + STICKY LAYOUT */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #f3d1e2ff 0%, #FFFFFF 100%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Fixed Header */}
          <Header />

          {/* Main content: header altına düşmesi için padding */}
          <Box
            component="main"
            sx={{
              flex: 1,
              pt: `${HEADER_HEIGHT}px`, // Header fixed olduğu için içerik aşağı iner
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Checkout />} />

              <Route path="/products/:id" element={<ProductDetail />} />

              {/* CAT */}
              <Route path="/cat/food" element={<CatFood />} />
              <Route path="/cat/accessories" element={<CatAccessories />} />

              {/* DOG */}
              <Route path="/dog/food" element={<DogFood />} />
              <Route path="/dog/accessories" element={<DogAccessories />} />

              {/* AUTH */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-orders" element={<MyOrders />} />


         <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />

            </Routes>
          </Box>

          {/* Footer en altta */}
          <Footer />
        </Box>
      </CartProvider>
    </UserProvider>
  );
}

export default App;