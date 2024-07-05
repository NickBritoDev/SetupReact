import { createContext, useContext } from "react";
import {
  IAutocontratacaoState,
  autocontratacaoReducerFunctions,
  useAutocontratacaoReducer,
} from "./state";

export interface IAutocontratacaoContext {
  state: IAutocontratacaoState;
  dispatch: ReturnType<typeof autocontratacaoReducerFunctions>;
}
export const AutocontratacaoContext =
  createContext<IAutocontratacaoContext | null>(null);

export function useAutocontratacao() {
  const context = useContext(AutocontratacaoContext);

  if (!context) {
    throw "Autocontratação Context Provider Não utilizado.";
  }

  return context;
}

export function getDefaultContext(): IAutocontratacaoContext {
  const [state, dispatch] = useAutocontratacaoReducer();
  const functions = autocontratacaoReducerFunctions(dispatch);

  return {
    state,
    dispatch: functions,
  };
}
