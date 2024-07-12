import { useAutocontratacao } from "@modules/public/autocontratacao-fgts/context/context";
import { type IDadosCliente } from "@modules/public/autocontratacao-fgts/context/state";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

const defaultFormik: IDadosCliente = {
  nome: "",
  cep: "",
  rg: "",
  sexo: "",
  banco: "",
  conta: "",
  renda: "",
  bairro: "",
  cidade: "",
  estado: "",
  numero: "",
  agencia: "",
  celular: "",
  endereco: "",
  nome_mae: "",
  nome_pai: "",
  estado_rg: "",
  tipo_conta: "",
  complemento: "",
  pais_origem: "",
  estado_civil: "",
  nacionalidade: "",
  orgao_emissor: "",
  cidade_natural: "",
  data_expedicao: "",
  estado_natural: "",
  data_nascimento: "",
  valor_patrimonio: "",
  cliente_iletrado_impossibilitado: "",
};

const schema = yup.object<IDadosCliente>({
  nome: yup.string().required("Nome é Necessário").min(1, "Nome é Necessário"),
  cep: yup
    .string()
    .matches(/\d{5}\-\d{3}/, "Formato de CEP Inválido")
    .required("CEP é Necessário"),
  rg: yup.string().required("RG é Necessário"),
  sexo: yup.string().required("Sexo é Necessário"),
  banco: yup.number().required("Banco é Necessário"),
  conta: yup.string().required("Conta é Necessário"),
  renda: yup.string().required("Renda é Necessário"),
  bairro: yup.string().required("Bairro é Necessário"),
  cidade: yup.string().required("Cidade é Necessário"),
  estado: yup.string().required("Estado é Necessário"),
  numero: yup.number().required("Número é Necessário"),
  agencia: yup.string().required("Agência é Necessário"),
  celular: yup
    .string()
    .matches(/\(\d{2}\) \d{4,5}-\d{4}/, "Celular Inválido")
    .required("Celular é Necessário"),
  endereco: yup.string().required("Endereço é Necessário"),
  nome_mae: yup.string().required("Nome da Mãe é Necessário"),
  nome_pai: yup.string().required("Nome do Pai é Necessário"),
  estado_rg: yup.string().required("Estado do RG é Necessário"),
  tipo_conta: yup.string().required("Tipo da Conta é Necessário"),
  complemento: yup.string().notRequired(),
  pais_origem: yup.string().notRequired(),
  estado_civil: yup.string().required("Estado Civil é Necessário"),
  nacionalidade: yup.string().notRequired(),
  orgao_emissor: yup.string().required("Órgão Emissor é Necessário"),
  cidade_natural: yup.string().required("Cidade Naturalidade é Necessário"),
  data_expedicao: yup.string().required("Data de Expedição é Necessário"),
  estado_natural: yup.string().required("Estado Naturalidade é Necessário"),
  data_nascimento: yup
    .string()
    .required("Data de data_nascimento é Necessário"),
  valor_patrimonio: yup.string().required("Valor Patrimonial é Necessário"),
  cliente_iletrado_impossibilitado: yup.string().notRequired(),
});

export const useDadosClienteFormik = (
  onSubmit: (
    values: IDadosCliente,
    formikHelpers: FormikHelpers<IDadosCliente>,
  ) => void | Promise<any>,
): ReturnType<typeof useFormik<IDadosCliente>> => {
  const {
    state: { dadosPessoais },
  } = useAutocontratacao();

  return useFormik<IDadosCliente>({
    onSubmit,
    initialValues: dadosPessoais ?? defaultFormik,
    validationSchema: schema,
  });
};
