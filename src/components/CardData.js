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
    <Grid sx={styles.mainGrid}>
      <Card sx={styles.addCardStyle} aria-label="card_main">
        <CardActionArea onClick={handleNewResume} sx={styles.addCardBg}>
          <AddIcon sx={styles.addIcon} />
        </CardActionArea>
        <CardActions sx={styles.cardAction}>
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
      <Stack aria-label="new_data" sx={styles.stackStyles}>
        {allResume.map((data) => (
          <Card
            aria-label="card_map"
            key={data?.id}
            // margin="30px"
            sx={styles.allCardStyles}
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
              sx={styles.allActionCard}
            >
              <>
                <Stack aria-label="icon_buttons" direction="row" spacing={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton aria-label="view">
                        <Link to={`/view/${data?._id}`}>
                          <Visibility sx={styles.resumeActionIcon} />
                        </Link>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="edit">
                        <Link to={`/edit/${data?._id}`}>
                          <Edit sx={styles.resumeActionIcon} />
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
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Grid>
  );
}
const styles = {
  mainGrid: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
  },
  addCardStyle: {
    maxWidth: 330,
    margin: "5%",
    display: "flex",
    flexDirection: "column",
  },
  addCardBg: { backgroundColor: "#9d4edd" },
  addIcon: {
    color: "black",
    width: "100%",
    fontSize: "12rem",
    // fontWeight: "bold",
    backgroundColor: "#c77dff",
  },
  cardAction: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
  },
  stackStyles: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    margin: "10px",
    padding: "10px",
  },
  allCardStyles: {
    maxWidth: 345,
    padding: "10px",
    width: "100%",
    height: { xs: "20%", sm: "20%", md: "80%" },
    margin: "25px 0 0 0",
  },
  allActionCard: { display: "flex", justifyContent: "center" },
  resumeActionIcon: { fontSize: "2rem", color: "purple" },
};
