import { executar } from "./interceptador";
import store from "./store";
import axios from "axios";

export interface IErroApiSimulador {
  message: string;
  error: string;
  statusCode: number;
}

const connectSimulador = axios.create({
  baseURL: "http://localhost:5003",
});

const { dispatch } = store;

connectSimulador.interceptors.response.use(
  async (response) => {
    if (response?.data?.message) {
      const message = response.data.message;
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
    const message = error.response.data.message;
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

export default connectSimulador;
