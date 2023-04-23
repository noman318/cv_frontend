import * as Yup from "yup";
export const resumeSchema = Yup.object({
  firstName: Yup.string()
    .min(3)
    .max(15)
    .required("Please Enter your First Name")
    .matches("^[a-zA-Z]*$", "Only Text Allowed"),
  lastName: Yup.string()
    .min(3)
    .max(15)
    .required("Please Enter your Last Name")
    .matches("^[a-zA-Z]*$", "Only Text Allowed"),
  phone: Yup.string()
    .min(10)
    .max(10)
    .matches("[0-9]{10}$", "10 Digits Only")
    .required("Enter Phone Number"),
  email: Yup.string().email().required("Please Enter your Email"),
  linkedIn: Yup.string().min(5).max(50).required(),
  github: Yup.string().min(5).max(50).required(),
  skype: Yup.string().min(5).max(50),
  twitter: Yup.string().min(5).max(50),
  address: Yup.string().min(0).max(1000).required(),
  summary: Yup.string().min(0).max(1000).required(),
  experience: Yup.array().of(
    Yup.object({
      position: Yup.string().min(0).max(255).required(),
      location: Yup.string().min(0).max(255).required(),
      company: Yup.string().min(0).max(255).required(),
      startDate: Yup.date().required(),
      endDate: Yup.date(),
      description: Yup.string().min(0).max(1000),
    })
  ),
  education: Yup.array().of(
    Yup.object({
      institution: Yup.string().min(0).max(255).required(),
      fieldOfStudy: Yup.string().min(0).max(255).required(),
      degree: Yup.string().min(0).max(255).required(),
      percentage: Yup.number().required(),
      startDate: Yup.date().required(),
      endDate: Yup.date(),
      description: Yup.string().min(0).max(1000),
    })
  ),
  skills: Yup.string()
    .matches(
      /^[\w\s,]+$/,
      "Skills must only contain letters, numbers, spaces, and commas"
    )
    .test(
      "at-least-two",
      "Enter at least two skills separated with commas",
      (value) => {
        const skills = value?.split(",")?.map((skill) => skill.trim()) || [];
        return skills.length >= 2;
      }
    ),
  hobbies: Yup.string()
    .matches(
      /^[\w\s,]+$/,
      "Hobbies must only contain letters, numbers, spaces, and commas"
    )
    .test(
      "at-least-two",
      "Enter at least two hobbies separated with commas",
      (value) => {
        const hobbies = value?.split(",")?.map((hobby) => hobby.trim()) || [];
        return hobbies.length >= 2;
      }
    ),
});
