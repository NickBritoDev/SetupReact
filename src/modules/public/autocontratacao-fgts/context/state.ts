import { formatCPF } from "@utils/mask/mascaras";
import { useReducer, Dispatch } from "react";
import { IBodyEnvioSimulacaoParcelas } from "../types/hooks";

type IAutocontratacaoActionNames =
  | "atualizarCpf"
  | "definirAppError"
  | "atualizarParcelasSelecionadasSaque";

export interface IAutocontratacaoAction {
  name: IAutocontratacaoActionNames;
  payload: any;
}

export interface IAutocontratacaoState {
  cpf: string;
  isAppError: boolean;
  anosSelecionados: number;
  parcelasSelecionadasSaque: IBodyEnvioSimulacaoParcelas | null;
}

export type IAutocontratacaoDispatch = Dispatch<IAutocontratacaoAction>;

function autocontratacaoReducer(
  state: IAutocontratacaoState,
  { name, payload }: IAutocontratacaoAction,
) {
  switch (name) {
    case "atualizarCpf": {
      return {
        ...state,
        cpf: formatCPF(payload),
      };
    }
    case "definirAppError": {
      return {
        ...state,
        isAppError: payload,
      };
    }
    case "atualizarParcelasSelecionadasSaque": {
      return {
        ...state,
        parcelasSelecionadasSaque: payload.parcelasSelecionadasSaque,
        anosSelecionados: payload.anosSelecionados,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

export const autocontratacaoDefault: IAutocontratacaoState = {
  cpf: "",
  isAppError: false,
  anosSelecionados: 0,
  parcelasSelecionadasSaque: null,
};

export function useAutocontratacaoReducer() {
  return useReducer(autocontratacaoReducer, autocontratacaoDefault);
}

export const autocontratacaoReducerFunctions = (
  dispatch: IAutocontratacaoDispatch,
) => ({
  atualizarCpf: (cpf: string) =>
    dispatch({ name: "atualizarCpf", payload: cpf }),
  definirAppError: (isError: boolean) =>
    dispatch({ name: "definirAppError", payload: isError }),
  atualizarParcelasSelecionadasSaque: (
    parcelasSelecionadasSaque: IBodyEnvioSimulacaoParcelas,
    anosSelecionados: number,
  ) =>
    dispatch({
      name: "atualizarParcelasSelecionadasSaque",
      payload: { parcelasSelecionadasSaque, anosSelecionados },
    }),
});
