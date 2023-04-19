import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Box
      sx={{
        marginTop: "5%",
        backgroundColor: "#7b2cbf",
        height: { xs: "150dvh", sm: "150dvh", md: "75dvh", xl: "60dvh" },
        backgroundSize: "cover",
        backgroundPosition: "center",
        // width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        padding: "3%",
        color: "white",
        textAlign: "center",
      }}
    >
      <Box
        aria-label="banner_content"
        sx={{ marginTop: { xs: "-40%", sm: "-40%", md: "-10%", xl: "-40%" } }}
      >
        <Typography variant="h4">My Cv the Resume Builder!</Typography>
        <Typography variant="h6" gutterBottom sx={{ marginTop: "15px" }}>
          Our platform is designed to help you create a professional and
          impressive resume in just a few easy steps. With our user-friendly
          interface and customizable templates, you can quickly and easily
          create a resume that showcases your skills, experience, and
          achievements.
        </Typography>
        <Typography variant="button">
          So why wait? Sign up for our resume builder today and take the first
          step towards landing your dream job!
        </Typography>
        <Stack mt={4} aria-label="getStartedStack" alignItems={"center"}>
          <Button
            size="xl"
            width="25%"
            aria-label="getStartedButton"
            sx={{
              marginTop: "15px",
              bgcolor: "antiquewhite",
              "&:hover": { bgcolor: "antiquewhite" },
              color: "black",
              width: { xs: "95%", sm: "50%", md: "40%", xl: "20%" },
            }}
          >
            Get Started
          </Button>
          <Typography variant="caption" mt={1}>
            Get started by registering or Logging In
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Banner;