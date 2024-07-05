import axios from "axios";

export const connectCrm = axios.create({
  baseURL: "https://apicrm.portalmaisvalor.com",
});

export const testInstance = axios.create({
  baseURL: "https://wha.portalmaisvalor.com",
});
