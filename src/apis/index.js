import axios from "axios";

const upbitBaseURL = `https://api.upbit.com/v1`;
const heroBaseURL = process.env.REACT_APP_HERO;
const baseURL = process.env.REACT_APP_API;

export const upbitApi = axios.create({
  baseURL: upbitBaseURL,
});

export const herokuApi = axios.create({
  baseURL: heroBaseURL,
});

const api = axios.create({
  baseURL,
});

export default api;
