import axios from "axios";

const connectApi = axios.create({
  baseURL: "https://apichatbot.portalmaisvalor.com",
});

export default connectApi;
