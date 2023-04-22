import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById, getUser } from "../services/MyService";
import {
  Typography,
  Grid,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import {
  Email,
  Phone,
  // eslint-disable-next-line
  LocationOn,
  GitHub,
  LinkedIn,
  FiberManualRecord,
} from "@mui/icons-material";
import Educationdetails from "../components/Educationdetails";
import ExperienceDetails from "../components/ExperienceDetails";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewResume = () => {
  const [resumeData, setResumeData] = useState();
  const [skills, setSkills] = useState();
  const [hobbies, setHobbies] = useState();
  const [educationDetails, setEducationDetails] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const singleId = params.id;
  //   console.log("singleId", singleId);
  const token = localStorage.getItem("_token");

  useEffect(() => {
    getResumeById(singleId, token)
      .then((res) => {
        // console.log("res", res);
        const resumeDetails = res?.data?.resume;
        // console.log("resumeDetails", resumeDetails);
        const skillData = res?.data?.resume?.skills;
        const educationData = res?.data?.resume?.education;
        const experienceData = res?.data?.resume?.experience;
        const hobbieData = res?.data?.resume?.hobbies;
        setHobbies(hobbieData);
        setSkills(skillData);
        setResumeData(resumeDetails);
        setEducationDetails(educationData);
        setExperienceDetails(experienceData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [singleId, token]);
  //   console.log("skills", skills);
  //   console.log("educationDetails", educationDetails);
  //   console.log("experienceDetails", experienceDetails);
  //   console.log("resume from state variable", resumeData);

  const userInfo = getUser();
  //   console.log("userInfo", userInfo);
  const firstNameInitials = userInfo?.firstName?.[0];
  const lastNameInitails = userInfo?.lastName?.[0];
  const downloadPDF = () => {
    const capture = document.querySelector(".full_resume");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("resume.pdf");
    });
  };
  return (
    <Container>
      <Grid
        sx={{
          border: "0.5px solid gray",
          marginTop: "20px",
          borderRadius: "5px",
          height: {
            xs: "282vh",
            sm: "266vh",
            md: "133vh",
            xl: "113vh",
          },
        }}
        aria-label="top_Level_grid"
        className="full_resume"
      >
        <Grid item sx={{ padding: "15px", margin: "3% 0" }}>
          <Grid
            item
            width={"100%"}
            aria-label="main_paper"
            sx={{ fontFamily: "serif" }}
          >
            <Grid item height={"10%"} width={"100%"} backgroundColor="#7b2cbf">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                padding={4}
                aria-label="heading_name"
              >
                <Box
                  sx={{
                    height: "50px",
                    width: "50px",
                    borderBottom: "3px solid white",
                    borderTop: "3px solid white",
                    borderRight: "0.2px solid white",
                    borderLeft: "0.2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                  aria-label="initial_name"
                >
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                      color: "white",
                      fontSize: "1.5rem",
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    {`${firstNameInitials} ${lastNameInitails}`}
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  color={"white"}
                  sx={{ fontSize: "2rem", fontFamily: "serif" }}
                >
                  {resumeData?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              display={"flex"}
              aria-label="division_flex"
              sx={{
                flexDirection: {
                  xs: "column-reverse",
                  sm: "column-reverse",
                  md: "row",
                  xl: "row",
                },
              }}
            >
              <Grid
                item
                flex={"0.6"}
                height={"100dvh"}
                sx={{ padding: "10px", marginBottom: "3%" }}
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#383b3e",
                      fontSize: "1.8rem",
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    Professional Summary
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "1.1rem",
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    Motivated and result-oriented project manager with five
                    years of experience in planning, monitoring and controlling
                    projects to closure.
                  </Typography>
                </Grid>
                <Divider sx={{ width: "90%", margin: "2% 0 2% 2%" }} />

                <Grid item>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "1.3rem",
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    Work History
                  </Typography>
                  {experienceDetails?.map((experience, index) => (
                    <React.Fragment key={index}>
                      <ExperienceDetails data={experience} />
                      {index !== experienceDetails.length - 1 && (
                        <Divider sx={{ width: "90%", margin: "3% 0 3% 3%" }} />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
                <Divider sx={{ width: "90%", margin: "3% 0 3% 3%" }} />

                <Grid item>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "1.3rem",
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    Education Details
                  </Typography>

                  {educationDetails?.map((education, index) => (
                    <React.Fragment key={index}>
                      <Educationdetails data={education} />
                      {index !== experienceDetails.length - 1 && (
                        <Divider sx={{ width: "90%", margin: "3% 0 3% 3%" }} />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                flex={"0.4"}
                height={"100dvh"}
                sx={{ backgroundColor: "#ddd0df" }}
              >
                <List sx={{ padding: "2px 0" }}>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontFamily: "serif",
                      marginLeft: "14px",
                      fontWeight: "bolder",
                    }}
                  >
                    Socail Links
                  </Typography>
                  <ListItem sx={{ padding: "4px 8px 4px 16px" }}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontFamily: "serif", fontSize: "18px" }}
                        >
                          {resumeData?.email}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ padding: "4px 8px 4px 16px" }}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontFamily: "serif", fontSize: "18px" }}
                        >
                          {resumeData?.phone}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ padding: "4px 8px 4px 16px" }}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      <GitHub />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontFamily: "serif", fontSize: "18px" }}
                        >
                          {resumeData?.github}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ padding: "4px 8px 4px 16px" }}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      <LinkedIn />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontFamily: "serif", fontSize: "18px" }}
                        >
                          {resumeData?.linkedIn}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
                <Divider sx={{ width: "90%", margin: "3% 0 3% 3%" }} />
                <List sx={{ padding: "2px 0" }}>
                  <Typography
                    sx={{
                      fontFamily: "serif",
                      marginLeft: "14px",
                      fontWeight: "bolder",
                    }}
                  >
                    Skills
                  </Typography>
                  {skills?.map((data, index) => (
                    <ListItem key={index} sx={{ padding: "4px 8px 4px 16px" }}>
                      <ListItemIcon sx={{ minWidth: "15px" }}>
                        <FiberManualRecord sx={{ fontSize: "13px" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontFamily: "serif",
                              textTransform: "capitalize",
                              marginLeft: "8px",
                              fontSize: "18px",
                            }}
                          >
                            {data}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ width: "90%", margin: "3% 0 3% 3%" }} />
                <List sx={{ padding: "2px 0" }}>
                  <Typography
                    sx={{
                      fontFamily: "serif",
                      marginLeft: "14px",
                      fontWeight: "bolder",
                    }}
                  >
                    Hobbies
                  </Typography>
                  {hobbies?.map((data, index) => (
                    <ListItem key={index} sx={{ padding: "4px 8px 4px 16px" }}>
                      <ListItemIcon sx={{ minWidth: "15px" }}>
                        <FiberManualRecord sx={{ fontSize: "13px" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontFamily: "serif",
                              textTransform: "capitalize",
                              marginLeft: "8px",
                              fontSize: "18px",
                            }}
                          >
                            {data}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        className="receipt-modal-download-button"
        onClick={downloadPDF}
        disabled={!(loader === false)}
      >
        {loader ? <span>Downloading</span> : <span>Download</span>}
      </Button>
    </Container>
  );
};

export default ViewResume;
