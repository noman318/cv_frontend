import axios from "axios";
import jwt_decode from "jwt-decode";

const apiUrl = "http://localhost:5000/api/v1/";

const postRegister = (data) => {
  return axios.post(`${apiUrl}register`, data);
};
const postLogin = (data) => {
  return axios.post(`${apiUrl}login`, data);
};
const getHeaders = (token) => ({
  headers: {
    token: `${token}`,
  },
});

const getAllResume = (id, token) => {
  return axios.get(`${apiUrl}resume/getall-resume/${id}`, getHeaders(token));
};

const getResumeById = (id, token) => {
  return axios.get(`${apiUrl}resume/get-resume/${id}`, getHeaders(token));
};

const createNewResume = (token, data) => {
  return axios.post(`${apiUrl}resume/create-resume`, data, getHeaders(token));
};

const editResume = (token, id, data) => {
  return axios.put(
    `${apiUrl}resume/update-resume/${id}`,
    data,
    getHeaders(token)
  );
};

const getUser = () => {
  try {
    return jwt_decode(localStorage.getItem("_token"));
  } catch (error) {
    return null;
  }
};
const isLoggedInPortal = () => {
  let data = localStorage.getItem("_token");
  if (!data) {
    return false;
  } else {
    return true;
  }
};
const doLogout = () => {
  localStorage.removeItem("_token");
  // window.location = "/login";
};

export {
  postRegister,
  postLogin,
  getUser,
  isLoggedInPortal,
  doLogout,
  getAllResume,
  getResumeById,
  createNewResume,
  editResume,
};
