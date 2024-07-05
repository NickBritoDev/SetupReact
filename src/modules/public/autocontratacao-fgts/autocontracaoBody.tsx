import {
  Text,
  Box,
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
  useSteps,
} from "@chakra-ui/react";
import Layout from "./components/layout";
import { STEPS, StepsAutocontratacao } from "./helpers/config";
import ConsultaSaldoComponent from "./components/steps/consultaSaldo";
import SelecaoSaqueComponent from "./components/steps/selecaoSaque";
import CadastroDadosPessoaisComponent from "./components/steps/cadastroDadosPessoais";
import ConfirmacaoComponent from "./components/steps/confirmacao";
import { IStepProps } from "./types/steps";
import { useAutocontratacao } from "./context/context";
import { useDesktop } from "@helpers/responsividade/useMediaQuery";

export default function AutocontracaoBody() {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: STEPS.length,
  });

  const {
    state: { isAppError },
  } = useAutocontratacao();

  const stepProps: IStepProps = {
    currentIndex: activeStep,
    goToNext,
    goToPrevious,
  };

  const isDesktop = useDesktop();

  return (
    <Layout>
      <Stack>
        <Stepper
          size={isDesktop ? "lg" : "sm"}
          index={activeStep}
          marginX={"10px"}
          marginTop={"5px"}
          colorScheme={isAppError ? "red" : "green"}
        >
          {STEPS.filter(
            (_, index) =>
              isDesktop || [activeStep, activeStep + 1].includes(index),
          ).map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle style={{ fontWeight: "bold" }}>
                  <Text w={"80%"}>{step.title}</Text>
                </StepTitle>
                {!isDesktop && (
                  <StepDescription>{step.description}</StepDescription>
                )}
              </Box>
              <StepSeparator _horizontal={{ ml: "0" }} />
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
