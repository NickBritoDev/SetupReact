import axios from "axios";

const connectApi = axios.create({
  baseURL: "https://apimaisvalorlabs.portalmaisvalor.com/api",
});

export default connectApi;
