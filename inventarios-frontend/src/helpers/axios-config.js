import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://inventarios-back-iud.herokuapp.com",
});

export { axiosInstance };
