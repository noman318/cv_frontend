import { Box, Typography } from "@mui/material";
import React from "react";

function HomeScreen() {
  return (
    <Box
      sx={{
        marginTop: "5%",
        backgroundImage:
          'url("https://i.pinimg.com/originals/c8/2f/c6/c82fc66e5ba57648ded9a9195e5c0a56.png")',
        height: "90dvh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box padding="3%" color="black" textAlign={"center"}>
        <Typography variant="h3" color="black">
          Welcome to our React and MUI-based resume builder!
        </Typography>
        <Typography variant="body1">
          Our platform is designed to help you create a professional and
          impressive resume in just a few easy steps. With our user-friendly
          interface and customizable templates, you can quickly and easily
          create a resume that showcases your skills, experience, and
          achievements.
        </Typography>
        <Typography>
          Our platform is built on React and MUI, two of the most powerful and
          popular tools for creating responsive and visually appealing web
          applications. Our team of experienced developers has worked hard to
          ensure that our platform is fast, reliable, and easy to use.
        </Typography>
        <Typography>
          So why wait? Sign up for our resume builder today and take the first
          step towards landing your dream job!
        </Typography>
      </Box>
    </Box>
  );
}

export default HomeScreen;
// Welcome to our React and MUI-based resume builder!

// Our platform is designed to help you create a professional and impressive resume in just a few easy steps. With our user-friendly interface and customizable templates, you can quickly and easily create a resume that showcases your skills, experience, and achievements.

// Our platform is built on React and MUI, two of the most powerful and popular tools for creating responsive and visually appealing web applications. Our team of experienced developers has worked hard to ensure that our platform is fast, reliable, and easy to use.

// Whether you're a seasoned professional or just starting out in your career, our resume builder has everything you need to create a standout resume that will impress potential employers. With a wide range of templates and customization options, you can tailor your resume to your unique skills and experience, ensuring that it stands out from the crowd.

// So why wait? Sign up for our resume builder today and take the first step towards landing your dream job!
