import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
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
      percentge: "",
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
  percentge: "",
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
  const { values, errors, touched, handleBlur, handleChange } = useFormik({});
  const [formValues, setFormValues] = useState(initialValues);
  const [expDetailsArr, setExpDetailsArr] = useState([INIT_EXP_FIELDS]);
  const [educationDetailsArr, setEducationDetailsArr] = useState([
    INIT_EDU_FIELDS,
  ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  const onAddEducation = () => {
    setEducationDetailsArr((pre) => [...pre, INIT_EDU_FIELDS]);
  };

  const onDeleteEduBox = (curindex) => {
    setEducationDetailsArr((pre) => {
      return pre.filter((_, i) => i !== curindex);
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              color="secondary"
              id="firstName"
              label="First Name"
              autoFocus
            />
            {errors.firstName && touched.firstName ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.lastName && touched.lastName ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.email && touched.email ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.phone && touched.phone ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
              autoFocus
            />
            {errors.github && touched.github ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.linkedIn && touched.linkedIn ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.skype && touched.skype ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.twitter && touched.twitter ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
              name="skills"
              label="Skills"
              type="skills"
              id="skills"
              color="secondary"
              autoComplete="skills"
              multiline
              rows={2}
            />
            {errors.skills && touched.skills ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
              name="hobbies"
              label="Hobbies"
              type="hobbies"
              id="hobbies"
              color="secondary"
              autoComplete="hobbies"
              multiline
              rows={2}
            />
            {errors.hobbies && touched.hobbies ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
              multiline
              rows={2}
            />
            {errors.address && touched.address ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
              type="summary"
              id="summary"
              color="secondary"
              autoComplete="summary"
              multiline
              rows={2}
            />
            {errors.summary && touched.summary ? (
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors.summary}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Divider
            sx={{ height: "4rem", width: "100%", backgroundColor: "#black" }}
          />

          <Typography variant="h6" gutterBottom>
            Education Details
          </Typography>
          <br />
          <Button variant="outlined" onClick={onAddEducation}>
            Add Education
          </Button>
          <br />
          {educationDetailsArr?.map((data, index) => {
            return (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDeleteEduBox(index)}
                >
                  Delete
                </Button>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="institution"
                    label="Institution"
                    type="institution"
                    id="institution"
                    color="secondary"
                    autoComplete="institution"
                  />
                  {errors.institution && touched.institution ? (
                    <Typography variant="caption" sx={{ color: "red" }}>
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
                    name="degree"
                    label="degree"
                    type="degree"
                    id="degree"
                    color="secondary"
                    autoComplete="degree"
                  />
                  {errors.degree && touched.degree ? (
                    <Typography variant="caption" sx={{ color: "red" }}>
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
                    name="percentge"
                    label="percentge"
                    type="percentge"
                    id="percentge"
                    color="secondary"
                    autoComplete="percentge"
                  />
                  {errors.percentge && touched.percentge ? (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.percentge}
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
                    label="fieldOfStudy"
                    type="fieldOfStudy"
                    id="fieldOfStudy"
                    color="secondary"
                    autoComplete="fieldOfStudy"
                  />
                  {errors.fieldOfStudy && touched.fieldOfStudy ? (
                    <Typography variant="caption" sx={{ color: "red" }}>
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
                  />
                  {errors.startDate && touched.startDate ? (
                    <Typography variant="caption" sx={{ color: "red" }}>
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
                  />
                  {errors.endDate && touched.endDate ? (
                    <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.company && touched.company ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.location && touched.location ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.position && touched.position ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.startDate && touched.startDate ? (
              <Typography variant="caption" sx={{ color: "red" }}>
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
            />
            {errors.endDate && touched.endDate ? (
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors.endDate}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Create Resume
        </Button>
      </Container>
    </Box>
  );
}
