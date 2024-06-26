export interface ModalType {
  descricao: string | null;
  ferramenta?: any;
  banner?: string | undefined;
}
export interface FiltrosType {
  onApplyFilters?: any;
  filters?: any;
}
export interface UsuariosType {
  id_acesso: number;
  perfil: string;
  nome: string;
  cnpj_matriz: string;
  foto: string;
}
