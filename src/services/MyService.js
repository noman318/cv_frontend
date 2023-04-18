import axios from "axios";
import jwt_decode from "jwt-decode";

const apiUrl = "http://localhost:5000/api/v1/";

const postRegister = (data) => {
  return axios.post(`${apiUrl}register`, data);
};
const postLogin = (data) => {
  return axios.post(`${apiUrl}login`, data);
};

const getUser = () => {
  try {
    return jwt_decode(localStorage.getItem("_token"));
  } catch (error) {
    return null;
  }
};
const isLoggedIn = () => {
  let data = localStorage.getItem("_token");
  if (!data) {
    return false;
  } else {
    return true;
  }
};
const doLogout = () => {
  localStorage.removeItem("_token");
  window.location = "/login";
};

export { postRegister, postLogin, getUser, isLoggedIn, doLogout };
