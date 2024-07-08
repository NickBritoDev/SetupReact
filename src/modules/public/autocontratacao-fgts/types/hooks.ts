export interface IRetornoConsultaSaque {
  data_saldo: string;
  horaSaldo: string;
  saldo_total: string;
  dataRepasse_1: string;
  valor_1: string;
  dataRepasse_2: string;
  valor_2: string;
  dataRepasse_3: string;
  valor_3: string;
  dataRepasse_4: string;
  valor_4: string;
  dataRepasse_5: string;
  valor_5: string;
  dataRepasse_6: string;
  valor_6: string;
  dataRepasse_7: string;
  valor_7: string;
  dataRepasse_8: string;
  valor_8: string;
  dataRepasse_9: string;
  valor_9: string;
  dataRepasse_10: string;
  valor_10: string;
}

export type IBodyEnvioSimulacaoParcelas = [
  {
    dataRepasse_1: string;
    valor_1: string;
  },
  {
    dataRepasse_2: string;
    valor_2: string;
  },
  {
    dataRepasse_3: string;
    valor_3: string;
  },
  {
    dataRepasse_4: string;
    valor_4: string;
  },
  {
    dataRepasse_5: string;
    valor_5: string;
  },
  {
    dataRepasse_6: string;
    valor_6: string;
  },
  {
    dataRepasse_7: string;
    valor_7: string;
  },
  {
    dataRepasse_8: string;
    valor_8: string;
  },
  {
    dataRepasse_9: string;
    valor_9: string;
  },
  {
    dataRepasse_10: string;
    valor_10: string;
  },
];

export interface IBodyEnvioSimulacao {
  cpf: string;
  parcelas: IBodyEnvioSimulacaoParcelas;
}

export interface IBodyConsultaSaque {
  erro: false;
  tipo: "Sucesso";
  msg: "Saldo retornado com sucesso";
  retorno: IRetornoConsultaSaque;
}
