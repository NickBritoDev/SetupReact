interface ISteps {
  title: string;
  description: string;
}
export const STEPS: ISteps[] = [
  { title: "Consulta de Saldo", description: "" },
  { title: "Seleção de Saque", description: "" },
  { title: "Cadastro de Dados Pessoais", description: "" },
];

export enum StepsAutocontratacao {
  CONSULTA_SALDO = 0,
  SELECAO_SAQUE = 1,
  CADASTRO_DADOS_PESSOAIS = 2,
  CONFIRMACAO = STEPS.length,
}

export const CONSULTA_SALDO_CPF = {
  cpf: "34282055880",
  taxa: "1.80",
  tabela: "50407",
  parcelas: [
    {
      dataRepasse_1: "01/05/2025",
      valor_1: "0.00",
    },
    {
      dataRepasse_2: "01/05/2026",
      valor_2: "0.00",
    },
    {
      dataRepasse_3: "01/05/2027",
      valor_3: "0.00",
    },
    {
      dataRepasse_4: "01/05/2028",
      valor_4: "0.00",
    },
    {
      dataRepasse_5: "01/05/2029",
      valor_5: "0.00",
    },
    {
      dataRepasse_6: "01/05/2030",
      valor_6: "0.00",
    },
    {
      dataRepasse_7: "01/05/2031",
      valor_7: "0.00",
    },
    {
      dataRepasse_8: "01/05/2032",
      valor_8: "0.00",
    },
    {
      dataRepasse_9: "01/05/2033",
      valor_9: "6.02",
    },
    {
      dataRepasse_10: "01/05/2034",
      valor_10: "5.81",
    },
  ],
};
