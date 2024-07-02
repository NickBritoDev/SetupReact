import {
  Box,
  Button,
  Flex,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import Layout from "./components/layout";
import { STEPS, StepsAutocontratacao } from "./helpers/config";
import ConsultaSaldoComponent from "./components/steps/consultaSaldo";
import SelecaoSaqueComponent from "./components/steps/selecaoSaque";
import CadastroDadosPessoaisComponent from "./components/steps/cadastroDadosPessoais";
import ConfirmacaoComponent from "./components/steps/confirmacao";
import { IStepProps } from "./types/steps";

export default function AutocontratacaoFgts() {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: STEPS.length,
  });

  const stepProps: IStepProps = {
    currentIndex: activeStep,
    goToNext,
    goToPrevious,
  };

  return (
    <Layout>
      <Stack>
        <Stepper
          size="sm"
          index={activeStep}
          marginX={"10px"}
          marginTop={"5px"}
        >
          {STEPS.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <StepSeparator _horizontal={{ ml: "0" }} />
              <Text>
                <StepTitle style={{ fontWeight: "bold" }}>
                  {step.title}
                </StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Text>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Flex flexGrow={"1"}>
        {activeStep === StepsAutocontratacao.CONSULTA_SALDO && (
          <ConsultaSaldoComponent {...stepProps} />
        )}
        {activeStep === StepsAutocontratacao.SELECAO_SAQUE && (
          <SelecaoSaqueComponent {...stepProps} />
        )}
        {activeStep === StepsAutocontratacao.CADASTRO_DADOS_PESSOAIS && (
          <CadastroDadosPessoaisComponent {...stepProps} />
        )}
        {activeStep === StepsAutocontratacao.CONFIRMACAO && (
          <ConfirmacaoComponent {...stepProps} />
        )}
      </Flex>
    </Layout>
  );
}
