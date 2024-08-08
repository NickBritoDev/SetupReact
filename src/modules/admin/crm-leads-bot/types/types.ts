export interface ContactTypes {
  length: any;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  score: "Frio" | "Médio" | "Quente" | null;
  status: "Novo" | "Contato" | "Negociando" | "Finalizado" | null;
  produto: string;
  origem: string;
}

export interface FiltrosTypes {
  filterStatus: any;
  filterScore: any;
  toggleFilterScore: any;
  onClose: any;
  toggleFilterStatus: any;
  detalhesLeads?: any;
  filterProducts?: any;
  toggleFilterProducts?: any;
}

export interface Log {
  responsavel: string;
  status: string;
  data_atualizacao: string;
}

export interface Contato {
  payload?: any
  substatus: string;
  idLead: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  produto: string;
  origem: string;
  status: string;
  score: string;
  logs?: Log[] | any;
}
