import axios from "axios";

const API = axios.create({
  baseURL: "https://careerguidance-oe1v.onrender.com/api",
});

export default API;