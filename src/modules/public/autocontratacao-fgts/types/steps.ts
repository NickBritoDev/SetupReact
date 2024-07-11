import { useDadosClienteFormik } from "../components/steps/cadastroDadosPessoais/formik";

export interface IStepProps {
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
}

export type IFormikDadosPessoais = ReturnType<typeof useDadosClienteFormik>;

export interface StepsDadosPessoaisProps {
  formik: IFormikDadosPessoais;
}
