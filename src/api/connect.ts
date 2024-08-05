import { isEnvDevelopment } from "@helpers/config/app";
import { executar } from "./interceptador";
import store from "./store";
import axios from "axios";

const connectApi = axios.create({
  baseURL: isEnvDevelopment
    ? "http://localhost:7006/api"
    : "https://apimaisvalorlabs.portalmaisvalor.com/api",
});

const { dispatch } = store;

connectApi.interceptors.request.use(
  (config) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      config.headers["x-access-token"] = token;
    } else {
      config.headers["x-access-token"] = undefined;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

connectApi.interceptors.response.use(
  async (response) => {
    if (response?.data?.notification) {
      const { message } = response.data.notification.message;
      const toastConfig = {
        trigger: true,
        msg: message,
        status: "success",
      };

      dispatch(executar(Object(toastConfig)));
    }
    return Promise.resolve(response);
  },
  async (error) => {
    const { message } = error.response.data.notification.message;
    if (error.response.status === 400) {
      const toastConfig = {
        trigger: true,
        msg: message,
        status: "warning",
      };

      dispatch(executar(Object(toastConfig)));

      return Promise.reject(error?.response);
    }

    return Promise.reject(error?.response);
  },
);

export default connectApi;
