import React, { useState, useCallback, memo, useRef, useEffect } from "react";
import {
  Button,
  TextField as MUITextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
// eslint-disable-next-line
import { Link, useNavigate, useParams } from "react-router-dom";
import { getResumeById, editResume } from "../services/MyService";
import { toast } from "react-toastify";
import { getUser } from "../services/MyService";
import { resumeSchema } from "../schema/resumeSchema";

const TextField = memo(MUITextField);

const initialValuesResume = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  summary: "",
  skills: [],
  experience: [
    {
      company: "",
      location: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ],
  education: [
    {
      institution: "",
      degree: "",
      percentage: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    },
  ],
  hobbies: [],
  linkedIn: "",
  skype: "",
  twitter: "",
  github: "",
};

const INIT_EDU_FIELDS = {
  institution: "",
  degree: "",
  percentage: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
};

const INIT_EXP_FIELDS = {
  company: "",
  location: "",
  position: "",
  startDate: "",
  endDate: "",
};

export default function EditResumeScreen() {
  const { errors, touched, handleBlur } = useFormik({
    initialValues: initialValuesResume,
    validationSchema: resumeSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const navigate = useNavigate();
  const params = useParams();
  const singleParams = params?.id;
  //   console.log("singleParams", singleParams);
  // eslint-disable-next-line
  const [experience, setExperience] = useState([INIT_EXP_FIELDS]);
  // eslint-disable-next-line
  const [education, setEducation] = useState([INIT_EDU_FIELDS]);
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [state, setState] = useState({ errMsg: "", succMsg: "" });
  const userInfo = getUser();

  const fname = userInfo?.firstName;
  const lname = userInfo?.lastName;
  const [userValues, setUserValues] = useState({
    firstName: fname || "",
    lastName: lname || "",
  });
  const skillRef = useRef();
  const hobbyRef = useRef();
  const token = localStorage.getItem("_token");
  // eslint-disable-next-line
  const [resume, setResume] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    github: "",
    linkedIn: "",
    skype: "",
    skills: [],
    hobbies: [],
    address: "",
    education: [],
    experience: [],
  });

  useEffect(() => {
    getResumeById(singleParams, token).then((res) => {
      const { resume } = res.data;
      setResume(resume);
      setEducationData(resume?.education);
      setExperienceData(resume?.experience);
      setFormData({
        firstName: resume.firstName || "",
        lastName: resume.lastName || "",
        email: resume.email || "",
        phone: resume.phone || "",
        github: resume.github || "",
        linkedIn: resume.linkedIn || "",
        skype: resume.skype || "",
        skills: resume.skills || [],
        hobbies: resume.hobbies || [],
        address: resume.address || "",
        summary: resume.summary || "",
        education: resume.education || [],
        experience: resume.experience || [],
      });
    });
  }, [singleParams, token]);
  //   console.log("resume", resume);
  //   console.log("educationData", educationData);
  //   console.log("experienceData", experienceData);
  const handleInputChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setEducationData((pre) => {
      const copyPre = JSON.parse(JSON.stringify(pre));
      const currObj = JSON.parse(JSON.stringify(copyPre[index] || {}));
      delete currObj._id;

      currObj[name] = value;
      copyPre[index] = currObj;
      return copyPre;
    });
    // console.log("Editing field", index, name, value);
  }, []);
  //   console.log("educationData", educationData);

  const handleInputChangeExp = useCallback((index, event) => {
    const { name, value } = event.target;
    setExperienceData((pre) => {
      const copyPre = JSON.parse(JSON.stringify(pre));
      const currObj = JSON.parse(JSON.stringify(copyPre[index] || {}));
      delete currObj._id;
      currObj[name] = value;
      copyPre[index] = currObj;
      return copyPre;
    });
    // console.log("Editing field", index, name, value);
  }, []);
  //   console.log("experienceData", experienceData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line
    const skills = skillRef.current.value;
    const skillsArray = skillRef.current.value
      ?.split(",")
      ?.map((skill) => skill?.trim());
    console.log("skillsArray", skillsArray);
    // eslint-disable-next-line
    const hobbies = hobbyRef.current.value;
    const hobbiesArray = hobbyRef.current.value
      ?.split(",")
      ?.map((hobby) => hobby?.trim());
    console.log("hobbiesArray", hobbiesArray);
    const formDataNew = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      github: data.get("github"),
      linkedIn: data.get("linkedIn"),
      skype: data.get("skype"),
      address: data.get("address"),
      summary: data.get("summary"),
      skills: skillsArray,
      hobbies: hobbiesArray,
      education: educationData,
      experience: experienceData,
    };
    console.log("formDataNew", formDataNew);
    editResume(token, singleParams, formDataNew)
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line
        if (res.data.err == 0) {
          setState({ ...state, succMsg: res.data.msg });
          toast.success("Updated Successfully");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
        // eslint-disable-next-line
        if (res.data.err == 1) {
          setState({ ...state, errMsg: res.data.msg });
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddEducation = () => {
    setEducationData((pre) => [...pre, INIT_EDU_FIELDS]);
  };

  const onDeleteEduBox = (curindex) => {
    setEducationData((pre) => {
      return pre.filter((_, i) => i !== curindex);
    });
  };

  const onAddExperience = () => {
    setExperienceData((pre) => [...pre, INIT_EXP_FIELDS]);
  };

  const onDeleteExpBox = (curindex) => {
    setExperienceData((pre) => {
      return pre.filter((_, i) => i !== curindex);
    });
  };

  // const getError = (field) => {
  //   return errors[field] && touched[field] ? (
  //     <Typography variant="caption" sx={styles.error}>
  //       {errors[field]}
  //     </Typography>
  //   ) : null;
  // };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={styles.mainForm}
    >
      <Container>
        <Typography variant="h5" gutterBottom>
          Edit Resume
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              color="secondary"
              id="firstName"
              label="First Name"
              value={userValues?.firstName}
              onChange={(e) =>
                setUserValues({ ...userValues, firstName: e.target.value })
              }
              onBlur={handleBlur}
            />
            {errors.firstName && touched.firstName ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.firstName}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              color="secondary"
              name="lastName"
              autoComplete="family-name"
              value={userValues?.lastName}
              onChange={(e) =>
                setUserValues({ ...userValues, lastName: e.target.value })
              }
              onBlur={handleBlur}
            />
            {errors.lastName && touched.lastName ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.lastName}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              color="secondary"
              autoComplete="email"
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.email}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Contact Number"
              name="phone"
              color="secondary"
              autoComplete="phone"
              value={formData?.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.phone}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="github"
              required
              fullWidth
              color="secondary"
              id="github"
              label="GitHub Link"
              value={formData?.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              onBlur={handleBlur}
            />
            {errors.github && touched.github ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.github}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="linkedIn"
              label="Linked Account"
              color="secondary"
              name="linkedIn"
              autoComplete="family-name"
              value={formData?.linkedIn}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, linkedIn: e.target.value })
              }
            />
            {errors.linkedIn && touched.linkedIn ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.linkedIn}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="skype"
              required
              fullWidth
              color="secondary"
              id="skype"
              label="Skype Id"
              autoFocus
              value={formData?.skype}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, skype: e.target.value })
              }
            />
            {errors.skype && touched.skype ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.skype}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="twitter"
              label="Twitter Handler"
              color="secondary"
              name="twitter"
              autoComplete="family-name"
              value={formData?.twitter}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
            />
            {errors.twitter && touched.twitter ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.twitter}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              inputRef={skillRef}
              name="skills"
              label="Skills"
              type="text"
              id="skills"
              color="secondary"
              autoComplete="skills"
              value={formData?.skills}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              multiline
              rows={2}
            />
            {errors.skills && touched.skills ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.skills}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              inputRef={hobbyRef}
              name="hobbies"
              label="Hobbies"
              type="text"
              id="hobbies"
              color="secondary"
              autoComplete="hobbies"
              value={formData?.hobbies}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, hobbies: e.target.value })
              }
              multiline
              rows={2}
            />
            {errors.hobbies && touched.hobbies ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.hobbies}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              color="secondary"
              autoComplete="address"
              value={formData?.address}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              multiline
              rows={2}
            />
            {errors.address && touched.address ? (
              <Typography variant="caption" sx={styles.error}>
                {errors.address}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="summary"
              label="Summary"
              type="text"
              id="summary"
              color="secondary"
              autoComplete="summary"
              value={formData?.summary}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              multiline
              rows={2}
            />
          </Grid>
          <Divider sx={styles.dividerStyles} />

          <Typography variant="h6" gutterBottom>
            Education Details
          </Typography>
          <br />
          <Button
            variant="outlined"
            onClick={onAddEducation}
            sx={styles.buttonStyles}
          >
            Add Education
          </Button>
          <br />
          {educationData?.map((data, index) => {
            return (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDeleteEduBox(index)}
                  sx={styles.buttonStyles}
                >
                  Delete
                </Button>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name={`institution`}
                    label="Institution"
                    type="institution"
                    id="institution"
                    color="secondary"
                    autoComplete="institution"
                    value={data.institution}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {errors.institution && touched.institution ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.institution}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name={`degree`}
                    label="degree"
                    type="degree"
                    id="degree"
                    color="secondary"
                    autoComplete="degree"
                    value={data.degree}
                    onChange={(event) => handleInputChange(index, event)}
                    error={errors.degree && touched.degree}
                  />
                  {errors.degree && touched.degree ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.degree}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name={`percentage`}
                    label="percentage"
                    type="percentage"
                    id="percentage"
                    color="secondary"
                    autoComplete="percentage"
                    value={data.percentage}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {errors.percentage && touched.percentage ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.percentage}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="fieldOfStudy"
                    label="Field Of Study"
                    type="fieldOfStudy"
                    id="fieldOfStudy"
                    color="secondary"
                    autoComplete="fieldOfStudy"
                    value={data.fieldOfStudy}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {errors.fieldOfStudy && touched.fieldOfStudy ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.fieldOfStudy}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="startDate"
                    label="Start Date"
                    type="date"
                    id="startDate"
                    color="secondary"
                    autoComplete="startDate"
                    value={
                      data?.startDate
                        ? new Date(data?.startDate)
                            ?.toISOString()
                            ?.substr(0, 10)
                        : ""
                    }
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {errors.startDate && touched.startDate ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.startDate}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="endDate"
                    label="End Date"
                    type="date"
                    id="endDate"
                    color="secondary"
                    autoComplete="endDate"
                    value={
                      data?.endDate
                        ? new Date(data?.endDate)?.toISOString()?.substr(0, 10)
                        : ""
                    }
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {errors.endDate && touched.endDate ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.endDate}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
              </>
            );
          })}

          <Divider sx={styles.dividerStyles} />

          <Typography variant="h6" gutterBottom>
            Experience Details
          </Typography>
          <br />

          <Button
            variant="outlined"
            onClick={onAddExperience}
            sx={styles.buttonStyles}
          >
            Add Expereince
          </Button>
          <br />
          {experienceData?.map((data, index) => {
            return (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDeleteExpBox(index)}
                  sx={styles.buttonStyles}
                >
                  Delete
                </Button>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="company"
                    label="Company"
                    type="company"
                    id="company"
                    color="secondary"
                    autoComplete="company"
                    value={data.company}
                    onChange={(event) => handleInputChangeExp(index, event)}
                  />
                  {errors.company && touched.company ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.company}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="location"
                    label="Location"
                    type="location"
                    id="location"
                    color="secondary"
                    autoComplete="location"
                    value={data.location}
                    onChange={(event) => handleInputChangeExp(index, event)}
                  />
                  {errors.location && touched.location ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.location}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="position"
                    label="Position"
                    type="position"
                    id="position"
                    color="secondary"
                    autoComplete="position"
                    value={data.position}
                    onChange={(event) => handleInputChangeExp(index, event)}
                  />
                  {errors.position && touched.position ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.position}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="startDate"
                    label="Start Date"
                    type="date"
                    id="startDate"
                    color="secondary"
                    autoComplete="startDate"
                    value={
                      data?.startDate
                        ? new Date(data?.startDate)
                            ?.toISOString()
                            ?.substr(0, 10)
                        : ""
                    }
                    onChange={(event) => handleInputChangeExp(index, event)}
                  />
                  {errors.startDate && touched.startDate ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.startDate}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="endDate"
                    label="End Date"
                    type="date"
                    id="endDate"
                    color="secondary"
                    autoComplete="endDate"
                    value={
                      data?.endDate
                        ? new Date(data?.endDate)?.toISOString()?.substr(0, 10)
                        : ""
                    }
                    onChange={(event) => handleInputChangeExp(index, event)}
                  />
                  {errors.endDate && touched.endDate ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.endDate}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
              </>
            );
          })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={styles.actionButton}
          color="secondary"
        >
          Update Resume
        </Button>
      </Container>
    </Box>
  );
}
const styles = {
  mainForm: { mt: 3 },
  dividerStyles: { height: "4rem", width: "100%", backgroundColor: "#black" },
  buttonStyles: { marginLeft: "10px", marginTop: "10px" },
  actionButton: { mt: 3, mb: 2 },
  error: { color: "red" },
};
