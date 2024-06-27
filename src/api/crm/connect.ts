import axios from "axios";

export const connectCrm = axios.create({
  baseURL: "https://apicrm.portalmaisvalor.com",
});
