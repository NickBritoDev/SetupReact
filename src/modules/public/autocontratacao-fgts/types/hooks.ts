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

export enum DadosPessoaisSexoV1 {
  Masculino = "M",
  Feminino = "F",
}

export enum DadosPessoaisEstadoCivilV1 {}

export enum DadosPessoaisNacionalidadeV1 {
  Estrangeiro = "2",
  Brasileiro = "1",
}

export interface IBodyEnvioDadosPessoaisV1 {
  id_simulador: string;
  cpf: string;
  nome: string;
  sexo: DadosPessoaisSexoV1;
  estado_civil: DadosPessoaisEstadoCivilV1;
  data_nascimento: string;
  rg: string;
  estado_rg: string;
  orgao_emissor: string;
  data_expedicao: string;
  estado_natural: string;
  cidade_natural: string;
  nacionalidade: "1";
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
  cliente_iletrado_impossibilitado: "S";
  banco: string;
  agencia: string;
  conta: string;
  tipo_conta: "C";
}

export interface IConsultaOption {
  value: string;
  text: string;
}
