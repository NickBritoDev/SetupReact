import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string().required("Usuário é obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
});
