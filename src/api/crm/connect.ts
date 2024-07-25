import axios from "axios";

export const connectCrm = axios.create({
  baseURL: "https://apicrm.portalmaisvalor.com",
  // baseURL: "http://localhost:5059/",
});

export const testInstance = axios.create({
  baseURL: "https://wha.portalmaisvalor.com",
});
