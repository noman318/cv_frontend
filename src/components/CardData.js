import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import {
  Card,
  Typography,
  CardActionArea,
  CardActions,
  Stack,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { getAllResume, getUser } from "../services/MyService";
export default function CardData() {
  const getUserInfo = getUser();
  // console.log("getUserInfo", getUserInfo);
  const { _id } = getUserInfo;
  const token = localStorage.getItem("_token");
  // console.log("_id", _id);
  const [allResume, setAllResume] = useState([]);
  console.log("allResume", allResume);
  useEffect(() => {
    getAllResume(_id, token).then((res) => {
      console.log("res", res);
      const { resumes } = res.data;
      setAllResume(resumes);
    });
  }, [_id, token]);
  const navigate = useNavigate();
  const handleNewResume = () => {
    navigate("/add-resume");
  };
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      <Card
        sx={{
          maxWidth: 330,
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
      <Stack
        aria-label="new_data"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          margin: "10px",
          padding: "10px",
        }}
      >
        {allResume.map((data) => (
          <Card
            aria-label="card_map"
            key={data?.id}
            margin="30px"
            sx={{
              maxWidth: 345,
              padding: "10px",
              width: "100%",
              height: { xs: "20%", sm: "20%", md: "80%" },
              margin: "30px",
            }}
          >
            <Typography
              fontSize={"1rem"}
              fontWeight={"bold"}
              textAlign="center"
            >
              Resumes
            </Typography>
            <CardMedia
              component="img"
              alt={data?.email}
              height="140"
              image="https://tse1.mm.bing.net/th?id=OIP.PSsBntFSL8JIN8Uf9LFXHgHaEK&pid=Api&P=0&w=300&h=300"
            />
            <CardContent>
              <Typography variant="body2" color="black">
                {data?.email}
              </Typography>
            </CardContent>
            <CardActions
              aria-label="icon_buttons_cards"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <>
                <Stack aria-label="icon_buttons" direction="row" spacing={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton aria-label="view">
                        <Link to={`/view/${data?._id}`}>
                          <Visibility
                            sx={{ fontSize: "2rem", color: "purple" }}
                          />
                        </Link>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="edit">
                        <Link to={`/edit/${data?._id}`}>
                          <Edit sx={{ fontSize: "2rem", color: "#bd3fbd" }} />
                        </Link>
                      </IconButton>
                    </Grid>
                    {/* <Grid item>
                      <IconButton aria-label="edit">
                        <>
                          <FileDownload
                            sx={{ fontSize: "2rem", color: "black" }}
                          />
                        </>
                      </IconButton>
                    </Grid> */}
                  </Grid>
                </Stack>
              </>
              {/* <Button size="small">Share</Button>
              <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Grid>
  );
}
