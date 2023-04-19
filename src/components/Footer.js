import * as React from "react";
import { Box, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {"Copyright © "}
      My CV Builder {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
        bgColor: "gray",
        width: "100%",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: { xs: "16px", sm: "16px", md: "24px" },
          px: { xs: "8px", sm: "8px", md: "16px" },
          mt: "auto",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "#9d4edd",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          MyCV Builder Created by Noman, All Rights Reserved.
        </Typography>
        <Copyright />
      </Box>
    </Box>
  );
}
