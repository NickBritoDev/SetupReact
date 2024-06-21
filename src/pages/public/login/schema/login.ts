import * as Yup from "yup";

export const validationSchema = Yup.object({
  usuario: Yup.string().required("Usuário é obrigatório"),
  senha: Yup.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
});
