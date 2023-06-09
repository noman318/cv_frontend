import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  FileDownload,
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
        console.log("resumeDetails", resumeDetails);
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
      <Grid sx={styles.buttonGrid}>
        <Button
          variant="contained"
          color="success"
          onClick={downloadPDF}
          disabled={!(loader === false)}
          startIcon={<FileDownload />}
        >
          {loader ? <span>Downloading</span> : <span>Download</span>}
        </Button>
      </Grid>
      <Grid
        sx={styles.mainGrid}
        aria-label="top_Level_grid"
        className="full_resume"
      >
        <Grid item sx={styles.itemOne}>
          <Grid item width={"100%"} aria-label="main_paper" sx={styles.fontOne}>
            <Grid item height={"10%"} width={"100%"} sx={styles.gridStyleHead}>
              <Box sx={styles.boxOne} padding={4} aria-label="heading_name">
                <Box sx={styles.logoBox} aria-label="initial_name">
                  <Typography sx={styles.logoName}>
                    {`${firstNameInitials} ${lastNameInitails}`}
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  sx={styles.headFont}
                >
                  {resumeData?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              display={"flex"}
              aria-label="division_flex"
              sx={styles.resumeDataMain}
            >
              <Grid
                item
                flex={"0.7"}
                height={"100dvh"}
                sx={styles.resumeDataRight}
              >
                <Grid item>
                  <Typography variant="h5" sx={styles.fontHead}>
                    Professional Summary
                  </Typography>
                  <Typography sx={styles.fontHeadTwo}>
                    {resumeData?.summary}
                  </Typography>
                </Grid>
                <Divider sx={styles.dividerStyle} />

                <Grid item>
                  <Typography sx={styles.componetStyles}>
                    Work History
                  </Typography>
                  {experienceDetails?.map((experience, index) => (
                    <React.Fragment key={index}>
                      <ExperienceDetails data={experience} />
                      {index !== experienceDetails.length - 1 && (
                        <Divider sx={styles.dividerStyle} />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
                <Divider sx={styles.dividerStyle} />

                <Grid item>
                  <Typography sx={styles.componetStyles}>
                    Education Details
                  </Typography>

                  {educationDetails?.map((education, index) => (
                    <React.Fragment key={index}>
                      <Educationdetails data={education} />
                      {index !== experienceDetails.length - 1 && (
                        <Divider sx={styles.dividerStyle} />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                flex={"0.3"}
                height={"100dvh"}
                sx={styles.fortyPercentStyles}
              >
                <List sx={styles.listStyles}>
                  <Typography sx={styles.socialStyles}>Socail Links</Typography>
                  <ListItem sx={styles.listItemStyles}>
                    <ListItemIcon sx={styles.listIconStyles}>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={styles.typoFontStyles}>
                          {resumeData?.email}
                        </Typography>
                      }
                      onClick={() =>
                        (window.location.href = `mailto:${resumeData?.email}`)
                      }
                    />
                  </ListItem>
                  <ListItem sx={styles.listItemStyles}>
                    <ListItemIcon sx={styles.listIconStyles}>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={styles.typoFontStyles}>
                          <a
                            href={`tel:${resumeData?.phone}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {resumeData?.phone}
                          </a>
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={styles.listItemStyles}>
                    <ListItemIcon sx={styles.listIconStyles}>
                      <GitHub />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={styles.typoFontStyles}>
                          <a
                            href={resumeData?.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {resumeData?.github}
                          </a>
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={styles.listItemStyles}>
                    <ListItemIcon sx={styles.listIconStyles}>
                      <LinkedIn />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={styles.typoFontStyles}>
                          <a
                            href={resumeData?.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {resumeData?.linkedIn}
                          </a>
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
                <Divider sx={styles.dividerStyle} />
                <List sx={styles.listStyles}>
                  <Typography sx={styles.typoListStyles}>Skills</Typography>
                  {skills?.map((data, index) => (
                    <ListItem key={index} sx={styles.listItemStyles}>
                      <ListItemIcon sx={styles.listIconStyles}>
                        <FiberManualRecord sx={styles.radioIcon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={styles.dataFont}>{data}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={styles.dividerStyle} />
                <List sx={styles.listStyles}>
                  <Typography sx={styles.typoListStyles}>Hobbies</Typography>
                  {hobbies?.map((data, index) => (
                    <ListItem key={index} sx={styles.listItemStyles}>
                      <ListItemIcon sx={styles.listIconStyles}>
                        <FiberManualRecord sx={styles.radioIcon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={styles.dataFont}>{data}</Typography>
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
    </Container>
  );
};

export default ViewResume;

const styles = {
  mainGrid: {
    border: "0.5px solid gray",
    marginTop: "20px",
    borderRadius: "5px",
    height: {
      xs: "350vh",
      sm: "276vh",
      md: "188vh",
      xl: "113vh",
    },
  },
  itemOne: { padding: "15px", margin: "3% 0" },
  fontOne: { fontFamily: "serif" },
  boxOne: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    height: "50px",
    width: "50px",
    borderBottom: "3px solid black",
    borderTop: "3px solid black",
    borderRight: "0.2px solid black",
    borderLeft: "0.2px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },
  logoName: {
    fontWeight: "bolder",
    fontSize: "1.5rem",
  },
  headFont: { fontSize: "2rem" },
  resumeDataMain: {
    flexDirection: {
      xs: "column-reverse",
      sm: "column-reverse",
      md: "row",
      xl: "row",
    },
  },
  resumeDataRight: { padding: "10px", marginBottom: "3%" },
  fontHead: {
    color: "#383b3e",
    fontSize: "1.8rem",
  },
  fontHeadTwo: {
    color: "black",
    fontSize: "1.1rem",
  },
  dividerStyle: { width: "90%", margin: "2% 0 2% 2%" },
  componetStyles: {
    color: "black",
    fontSize: "1.3rem",
  },
  socialStyles: {
    marginTop: "10px",

    marginLeft: "14px",
    fontWeight: "bolder",
  },
  fortyPercentStyles: { backgroundColor: "#caf0f8" },
  listStyles: { padding: "2px 0" },
  listItemStyles: { padding: "4px 8px 4px 16px" },
  listIconStyles: { minWidth: "35px", cursor: "pointer" },
  typoFontStyles: { fontSize: "18px", cursor: "pointer" },
  typoListStyles: {
    marginLeft: "14px",
    fontWeight: "bolder",
    cursor: "pointer",
  },
  dataFont: {
    textTransform: "capitalize",
    marginLeft: "8px",
    fontSize: "18px",
  },
  radioIcon: { fontSize: "13px" },
  buttonGrid: { display: "flex", justifyContent: "flex-end", marginTop: "2%" },
  linkStyles: { textDecoration: "none", color: "inherit" },
  gridStyleHead: {
    border: "2px solid black",
    boxShadow: "0 0 5px rgba(0,0,0,0.3",
  },
};
