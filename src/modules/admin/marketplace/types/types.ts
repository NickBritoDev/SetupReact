export interface ModalType {
  descricao: string | null;
  ferramenta?: any;
  banner?: string | undefined;
}
export interface FiltrosType {
  onApplyFilters?: any;
  filters?: any;
}

export enum UsuariosTypeStatus {
  Liberado = "Liberado",
  Pendente = "Pendente",
  Recusado = "Recusado",
  Bloqueado = "Bloqueado",
  Expirado = "Expirado",
}

export interface UsuariosType {
  status: UsuariosTypeStatus;
  idAcesso: number;
  perfil: string;
  nome: string;
  cnpj_matriz: string;
  foto: string;
}

export interface CardTypeGrupo {
  status: UsuariosTypeStatus;
  idAcesso: number;
  nome: string;
  foto: string;
  gerente: string;
  superintendente: string;
  supervisor: string;
  isAdmin: boolean;
}

export interface CardType {
  banner: string;
  descricao: string | null;
  ferramenta: string;
  foto: string | null;
  grupo: CardTypeGrupo[];
  idFerramenta: number;
  status: UsuariosTypeStatus;
}

export type RetornoConsultaMarketplace = CardType;

export interface BodyPutSolicitacaoAcesso {
  id_acesso: number;
  id_produto: number;
  status: "Bloqueado" | "Pendente";
}

export interface BodyPutSolicitacaoAdmins {
  id_acesso: number;
  id_produto: number;
  is_admin: boolean;
}
