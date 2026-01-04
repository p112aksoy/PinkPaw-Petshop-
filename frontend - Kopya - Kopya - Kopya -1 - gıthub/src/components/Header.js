import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { items } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const totalCount = items.reduce((sum, it) => sum + (it.quantity || 1), 0);

  const [catAnchor, setCatAnchor] = useState(null);
  const [dogAnchor, setDogAnchor] = useState(null);
  const [accountAnchor, setAccountAnchor] = useState(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setCatAnchor(null);
    setDogAnchor(null);
    setAccountAnchor(null);
  };

  const handleAccountClick = (e) => {
    if (!user) navigate("/login");
    else setAccountAnchor(e.currentTarget);
  };

  const handleLogout = () => {
    logout();
    closeAll();
    navigate("/");
  };

  /* COLORS */
  const textColor = scrolled ? "#5A2A4A" : "#ffffff";
  const hoverColor = "#C2185B"; // 🔥 DARK PINK (fixed)

  const menuItemStyle = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: textColor,
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": {
      color: hoverColor,
    },
  };

  const menuPaperSx = {
    mt: 1,
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.96)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled
          ? "rgba(255, 230, 240, 0.95)"
          : "transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        backdropFilter: scrolled ? "blur(6px)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          minHeight: 72,
        }}
      >
        {/* LOGO */}
        <Typography
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: textColor,
            mr: 6,
            transition: "color 0.25s ease",
            "&:hover": {
              color: hoverColor,
            },
          }}
        >
          Pink
          <span style={{ color: hoverColor }}>Paw</span>
        </Typography>

        {/* MENU */}
        <Box sx={{ display: "flex", gap: 4, flexGrow: 1, alignItems: "center" }}>
          <MenuLink to="/" label="Home" sx={menuItemStyle} />

          <Typography
            sx={menuItemStyle}
            onClick={(e) => setCatAnchor(e.currentTarget)}
          >
            Cat
          </Typography>
          <Menu
            anchorEl={catAnchor}
            open={Boolean(catAnchor)}
            onClose={closeAll}
            PaperProps={{ sx: menuPaperSx }}
          >
            <DropdownItem
              to="/cat/food"
              label="Food & Treats"
              onClick={closeAll}
            />
            <DropdownItem
              to="/cat/accessories"
              label="Accessories"
              onClick={closeAll}
            />
          </Menu>

          <Typography
            sx={menuItemStyle}
            onClick={(e) => setDogAnchor(e.currentTarget)}
          >
            Dog
          </Typography>
          <Menu
            anchorEl={dogAnchor}
            open={Boolean(dogAnchor)}
            onClose={closeAll}
            PaperProps={{ sx: menuPaperSx }}
          >
            <DropdownItem
              to="/dog/food"
              label="Food & Treats"
              onClick={closeAll}
            />
            <DropdownItem
              to="/dog/accessories"
              label="Accessories"
              onClick={closeAll}
            />
          </Menu>

          <MenuLink to="/contact" label="Contact" sx={menuItemStyle} />
        </Box>

        {/* ACCOUNT */}
        <IconButton
          onClick={handleAccountClick}
          sx={{
            color: textColor,
            "&:hover": { color: hoverColor },
          }}
        >
          {user && (
            <Typography
              sx={{
                mr: 1,
                fontSize: "0.9rem",
                fontWeight: 600,
                color: textColor,
              }}
            >
              {user.username || user.email}
            </Typography>
          )}
          <PersonOutlineIcon />
        </IconButton>

        <Menu
          anchorEl={accountAnchor}
          open={Boolean(accountAnchor)}
          onClose={closeAll}
          PaperProps={{ sx: menuPaperSx }}
        >
          <MenuItem
  onClick={() => {
    closeAll();
    navigate("/my-orders");
  }}
  sx={{
    display: "flex",
    gap: 1,
    alignItems: "center",
    "&:hover": { color: hoverColor },
  }}
>
  <ListAltIcon fontSize="small" />
  My Orders
</MenuItem>

          <MenuItem
            onClick={() => {
              closeAll();
              navigate("/profile");
            }}
            sx={{
              "&:hover": { color: hoverColor },
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              "&:hover": { color: hoverColor },
            }}
          >
            Exit
          </MenuItem>
        </Menu>

        {/* CART */}
        <IconButton
          component={Link}
          to="/cart"
          sx={{
            color: textColor,
            "&:hover": { color: hoverColor },
          }}
        >
          <Badge badgeContent={totalCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

/* HELPERS */

const MenuLink = ({ to, label, sx }) => (
  <Typography component={Link} to={to} sx={sx}>
    {label}
  </Typography>
);

const DropdownItem = ({ to, label, onClick }) => (
  <MenuItem
    component={Link}
    to={to}
    onClick={onClick}
    sx={{
      color: "#5A2A4A",
      "&:hover": { color: "#C2185B" },
    }}
  >
    {label}
  </MenuItem>
);
