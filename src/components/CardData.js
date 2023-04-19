import React from "react";
// eslint-disable-next-line
import {
  Button,
  Card,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
export default function CardData() {
  const navigate = useNavigate();
  const handleNewResume = () => {
    navigate("/add-resume");
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "5%",
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="card_main"
    >
      <CardActionArea
        onClick={handleNewResume}
        sx={{ backgroundColor: "#9d4edd" }}
      >
        <AddIcon
          sx={{
            color: "black",
            width: "100%",
            fontSize: "12rem",
            // fontWeight: "bold",
            backgroundColor: "#c77dff",
          }}
        />
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="button"
          component="div"
          textAlign={"center"}
        >
          Create New
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create a new Resume.
        </Typography>
      </CardActions>
    </Card>
  );
}
