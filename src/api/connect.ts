import axios from "axios";

const connectApi = axios.create({
  baseURL: "http://apimaisvalorlabs.portalmaisvalor.com",
});

export default connectApi;
