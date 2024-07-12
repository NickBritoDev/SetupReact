import { formatCPF } from "@utils/mask/mascaras";
import { useReducer, Dispatch } from "react";
import { IBodyEnvioSimulacaoParcelas } from "../types/hooks";
import { StepsAutocontratacao } from "../helpers/config";

type IAutocontratacaoActionNames =
  | "atualizarCpf"
  | "definirAppError"
  | "atualizarParcelasSelecionadasSaque"
  | "atualizarDadosCliente"
  | "definirEditarCampos"
  | "limparEdicao";

export interface IAutocontratacaoAction {
  name: IAutocontratacaoActionNames;
  payload: any;
}

export interface IConfigEditar {
  stepDadosPessoais?: number;
}

export interface IDadosCliente {
  nome: string;
  sexo: string;
  estado_civil: string;
  data_nascimento: string;
  rg: string;
  estado_rg: string;
  orgao_emissor: string;
  data_expedicao: string;
  estado_natural: string;
  cidade_natural: string;
  nacionalidade: string;
  pais_origem: string;
  celular: string;
  renda: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  nome_mae: string;
  nome_pai: string;
  valor_patrimonio: string;
  cliente_iletrado_impossibilitado: string;
  banco: string;
  agencia: string;
  conta: string;
  tipo_conta: string;
}

export interface IAutocontratacaoState {
  cpf: string;
  isAppError: boolean;
  errorMessage: string;
  errorPodeRetornar: boolean;
  anosSelecionados: number;
  parcelasSelecionadasSaque: IBodyEnvioSimulacaoParcelas | null;
  dadosPessoais: IDadosCliente | null;
  isEditar: boolean;
  editarConfig: IConfigEditar;
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
        isAppError: payload.isError,
        errorMessage: payload.errorMessage,
        errorPodeRetornar: payload.errorPodeRetornar,
      };
    }
    case "atualizarParcelasSelecionadasSaque": {
      return {
        ...state,
        parcelasSelecionadasSaque: payload.parcelasSelecionadasSaque,
        anosSelecionados: payload.anosSelecionados,
      };
    }
    case "atualizarDadosCliente": {
      return {
        ...state,
        dadosPessoais: payload,
      };
    }
    case "definirEditarCampos": {
      return {
        ...state,
        isEditar: true,
        editarConfig: payload.config,
      };
    }
    case "limparEdicao": {
      return {
        ...state,
        isEditar: false,
        editarConfig: {},
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
  errorMessage: "",
  errorPodeRetornar: true,
  anosSelecionados: 0,
  parcelasSelecionadasSaque: null,
  dadosPessoais: null,
  isEditar: false,
  editarConfig: {},
};

export function useAutocontratacaoReducer() {
  return useReducer(autocontratacaoReducer, autocontratacaoDefault);
}

export const autocontratacaoReducerFunctions = (
  dispatch: IAutocontratacaoDispatch,
) => ({
  atualizarCpf: (cpf: string) =>
    dispatch({ name: "atualizarCpf", payload: cpf }),
  definirAppError: (
    isError: boolean,
    errorMessage: string = "Ocorreu um erro",
    errorPodeRetornar: boolean = true,
  ) =>
    dispatch({
      name: "definirAppError",
      payload: { isError, errorMessage, errorPodeRetornar },
    }),
  removerAppError: () =>
    dispatch({
      name: "definirAppError",
      payload: { isError: false, errorMessage: "", errorPodeRetornar: true },
    }),
  atualizarParcelasSelecionadasSaque: (
    parcelasSelecionadasSaque: IBodyEnvioSimulacaoParcelas,
    anosSelecionados: number,
  ) =>
    dispatch({
      name: "atualizarParcelasSelecionadasSaque",
      payload: { parcelasSelecionadasSaque, anosSelecionados },
    }),
  atualizarDadosCliente: (dados: IDadosCliente) =>
    dispatch({ name: "atualizarDadosCliente", payload: dados }),
  definirEditarCampos: (config: IConfigEditar) =>
    dispatch({ name: "definirEditarCampos", payload: { config } }),
  limparEdicao: () => dispatch({ name: "limparEdicao", payload: null }),
});
