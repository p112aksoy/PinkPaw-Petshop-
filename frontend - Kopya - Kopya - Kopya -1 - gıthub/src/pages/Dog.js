import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

function Dog() {
  return (
    <Box sx={{ padding: 5 }}>
      {/* Sayfa Başlığı */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dog Products 🐶
      </Typography>

      {/* TEST KUTUSU */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          backgroundColor: "#c1e1dc",
          borderRadius: 2,
        }}
      >
        TEST: Dog page loaded successfully.
      </Box>

      {/* Ürün Kartları */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ width: 220 }}>
          <CardContent>
            <Typography fontWeight={600}>Dog Collar</Typography>
            <Typography color="text.secondary">$12</Typography>
            <Button size="small" sx={{ mt: 1 }}>
              View
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 220 }}>
          <CardContent>
            <Typography fontWeight={600}>Dog Leash</Typography>
            <Typography color="text.secondary">$15</Typography>
            <Button size="small" sx={{ mt: 1 }}>
              View
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Dog;
