import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

function Cat() {
  return (
    <Box sx={{ padding: 5 }}>
      {/* Sayfa Başlığı */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Cat Products 🐱
      </Typography>

      {/* TEST KUTUSU */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          backgroundColor: "#ffe4ea",
          borderRadius: 2,
        }}
      >
        TEST: Cat page loaded successfully.
      </Box>

      {/* Ürün Kartları */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ width: 220 }}>
          <CardContent>
            <Typography fontWeight={600}>Cat Toy</Typography>
            <Typography color="text.secondary">$8</Typography>
            <Button size="small" sx={{ mt: 1 }}>
              View
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 220 }}>
          <CardContent>
            <Typography fontWeight={600}>Cat Bed</Typography>
            <Typography color="text.secondary">$25</Typography>
            <Button size="small" sx={{ mt: 1 }}>
              View
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Cat;
