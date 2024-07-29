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

export interface IPermissao {
  chave: string;
  nome: string;
  id_produto: number;
  descricao: string;
}

export interface ISolicitacaoAcesso {
  id_acesso: number;
  id_acesso_solicitante: number;
  status: UsuariosTypeStatus;
  motivo_status: null | string;
  id_promotora: number;
  id_produto: number;
  is_admin: boolean;
  is_dev: boolean;
}

export type IUsuarioGrupoAcesso = ISolicitacaoAcesso & {
  nome: string;
  foto: string;
};

export interface IGruposAcesso {
  id: number;
  nome: string;
  id_produto: number;
  id_promotora: number;
  ativo: boolean;
  usuarios?: IUsuarioGrupoAcesso[];
  permissoes?: IPermissao[];
}
