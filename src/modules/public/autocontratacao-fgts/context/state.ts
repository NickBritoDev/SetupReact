import { formatCPF } from "@utils/mask/mascaras";
import { useReducer, Dispatch } from "react";

type IAutocontratacaoActionNames = "atualizarCpf" | "definirAppError";

export interface IAutocontratacaoAction {
  name: IAutocontratacaoActionNames;
  payload: any;
}

export interface IAutocontratacaoState {
  cpf: string;
  isAppError: boolean;
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
});
