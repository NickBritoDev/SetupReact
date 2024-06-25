export interface ContactTypes {
  length: any;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  score: "FRIO" | "MEDIO" | "QUENTE" | null;
  status: "NOVO" | "CONTATO" | "NEGOCIANDO" | "FINALIZADO" | null;
  produto: string;
  origem: string;
  id: number;
}

export interface FiltrosTypes {
  filterStatus: any;
  filterScore: any;
  toggleFilterScore: any;
  onClose: any;
  toggleFilterStatus: any;
}

export interface Log {
  responsavel: string;
  status: string;
  data_atualizacao: string;
}

export interface Contato {
  id: number;
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
