import React, { useState, useCallback, memo, useRef } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { createNewResume } from "../services/MyService";
import { toast } from "react-toastify";
import { getUser } from "../services/MyService";
import { resumeSchema } from "../schema/resumeSchema";

const TextField = memo(MUITextField);

const initialValuesResume = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
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

export default function CreateResumeScreen() {
  const [experience, setExperience] = useState([INIT_EXP_FIELDS]);
  const [education, setEducation] = useState([INIT_EDU_FIELDS]);
  const [state, setState] = useState({ errMsg: "", succMsg: "" });
  const userInfo = getUser();

  const fname = userInfo?.firstName;
  const lname = userInfo?.lastName;
  const userPhone = userInfo?.phone;
  const userEmail = userInfo?.email;
  const [userValues, setUserValues] = useState({
    firstName: fname || "",
    lastName: lname || "",
    email: userEmail || "",
    phone: userPhone || "",
  });
  const skillRef = useRef();
  const hobbyRef = useRef();
  // const navigate = useNavigate();

  const token = localStorage.getItem("_token");
  // console.log("token", token);

  // console.log("skillData", skills);
  // console.log("userInfo", userInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line
    const skills = skillRef.current.value;
    const skillsArray =
      typeof values.skills === "string"
        ? values.skills?.split(",")?.map((skill) => skill.trim())
        : [];
    console.log("skillsArray", skillsArray);
    // console.log("skilss in Ref data", skills);
    // eslint-disable-next-line
    const hobbies = hobbyRef.current.value;
    // console.log("hobbies", hobbies);
    const hobbiesArray =
      typeof values.hobbies === "string"
        ? values.hobbies?.split(",")?.map((hobby) => hobby.trim())
        : [];
    console.log("hobbiesArray", hobbiesArray);
    const formDataNew = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      github: data.get("github"),
      linkedIn: data.get("linkedIn"),
      skype: data.get("skype"),
      summary: data.get("summary"),
      skills: skillsArray,
      hobbies: hobbiesArray,
      address: data.get("address"),
      education: education,
      experience: experience,
    };
    console.log("formDataNew", formDataNew);
    createNewResume(token, formDataNew)
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line
        if (res.data.err == 0) {
          setState({ ...state, succMsg: res.data.msg });
          toast.success("Created Successfully");
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

  const handleInputChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setEducation((pre) => {
      const copyPre = JSON.parse(JSON.stringify(pre));
      const currObj = JSON.parse(JSON.stringify(copyPre[index] || {}));
      currObj[name] = value;
      copyPre[index] = currObj;
      return copyPre;
    });
  }, []);
  // console.log("education", education);

  const handleInputChangeExp = useCallback((index, event) => {
    const { name, value } = event.target;
    setExperience((pre) => {
      const copyPre = JSON.parse(JSON.stringify(pre));
      const currObj = JSON.parse(JSON.stringify(copyPre[index] || {}));
      currObj[name] = value;
      copyPre[index] = currObj;
      return copyPre;
    });
  }, []);
  // console.log("experience", experience);

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: initialValuesResume,
    validationSchema: resumeSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const onAddEducation = () => {
    setEducation((pre) => [...pre, INIT_EDU_FIELDS]);
  };

  const onDeleteEduBox = (curindex) => {
    setEducation((pre) => {
      return pre.filter((_, i) => i !== curindex);
    });
  };

  const onAddExperience = () => {
    setExperience((pre) => [...pre, INIT_EXP_FIELDS]);
  };

  const onDeleteExpBox = (curindex) => {
    setExperience((pre) => {
      return pre.filter((_, i) => i !== curindex);
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={styles.mainForm}
    >
      <Container>
        <Typography variant="h5" gutterBottom>
          Create New Resume
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              color="primary"
              id="firstName"
              label="First Name"
              value={userValues.firstName}
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
              color="primary"
              name="lastName"
              autoComplete="family-name"
              value={userValues.lastName}
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
              color="primary"
              autoComplete="email"
              value={userValues.email}
              onChange={(e) =>
                setUserValues({ ...userValues, email: e.target.value })
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
              color="primary"
              autoComplete="phone"
              value={userValues.phone}
              onChange={(e) =>
                setUserValues({ ...userValues, phone: e.target.value })
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
              color="primary"
              id="github"
              label="GitHub Link"
              value={values.github}
              onChange={handleChange}
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
              color="primary"
              name="linkedIn"
              autoComplete="family-name"
              value={values.linkedIn}
              onBlur={handleBlur}
              onChange={handleChange}
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
              color="primary"
              id="skype"
              label="Skype Id"
              value={values.skype}
              onBlur={handleBlur}
              onChange={handleChange}
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
              color="primary"
              name="twitter"
              autoComplete="family-name"
              value={values.twitter}
              onBlur={handleBlur}
              onChange={handleChange}
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
              color="primary"
              autoComplete="skills"
              value={values.skills}
              onBlur={handleBlur}
              onChange={handleChange}
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
              color="primary"
              autoComplete="hobbies"
              value={values.hobbies}
              onBlur={handleBlur}
              onChange={handleChange}
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
              color="primary"
              autoComplete="address"
              value={values.address}
              onBlur={handleBlur}
              onChange={handleChange}
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
              placeholder="Describe yourself in few sentences."
              id="summary"
              color="primary"
              autoComplete="summary"
              value={values.summary}
              onBlur={handleBlur}
              onChange={handleChange}
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
          {education?.map((data, index) => {
            return (
              <>
                <Button
                  variant="outlined"
                  color="error"
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
                    color="primary"
                    autoComplete="institution"
                    // value={data.institution}
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
                    color="primary"
                    autoComplete="degree"
                    // value={data.degree}
                    onChange={(event) => handleInputChange(index, event)}
                    error={errors.degree && touched.degree}
                    helperTex={touched.degree && errors.degree}
                  />
                  {/* {errors.degree && touched.degree ? (
                    <Typography variant="caption" sx={styles.error}>
                      {errors.degree}
                    </Typography>
                  ) : (
                    ""
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name={`percentage`}
                    label="percentage"
                    type="percentage"
                    id="percentage"
                    color="primary"
                    autoComplete="percentage"
                    // value={data.percentage}
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
                    color="primary"
                    autoComplete="fieldOfStudy"
                    // value={data.fieldOfStudy}
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
                    color="primary"
                    autoComplete="startDate"
                    // value={data.startDate}
                    onChange={(event) => handleInputChange(index, event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    color="primary"
                    autoComplete="endDate"
                    // value={data.endDate}
                    onChange={(event) => handleInputChange(index, event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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

          <Divider
            sx={{ height: "4rem", width: "100%", backgroundColor: "#black" }}
          />

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
          {experience?.map((data, index) => {
            return (
              <>
                <Button
                  variant="outlined"
                  color="error"
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
                    color="primary"
                    autoComplete="company"
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
                    color="primary"
                    autoComplete="location"
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
                    color="primary"
                    autoComplete="position"
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
                    color="primary"
                    autoComplete="startDate"
                    onChange={(event) => handleInputChangeExp(index, event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    color="primary"
                    autoComplete="endDate"
                    onChange={(event) => handleInputChangeExp(index, event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
          color="primary"
        >
          Create Resume
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
