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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
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
import { BsX } from "react-icons/bs";

export default function AutocontracaoBody() {
  const {
    activeStep,
    goToNext: nextStep,
    goToPrevious: previousStep,
    setActiveStep,
  } = useSteps({
    index: 0,
    count: STEPS.length,
  });

  const {
    state: { isAppError, errorMessage, errorPodeRetornar, isEditar },
    dispatch: { removerAppError, limparEdicao },
  } = useAutocontratacao();

  function goToNext() {
    if (isEditar) {
      limparEdicao();
      return setActiveStep(StepsAutocontratacao.CONFIRMACAO);
    }

    nextStep();
  }

  function goToPrevious() {
    if (isEditar) {
      limparEdicao();
      return setActiveStep(StepsAutocontratacao.CONFIRMACAO);
    }

    previousStep();
  }

  const stepProps: IStepProps = {
    currentIndex: activeStep,
    goToNext,
    goToPrevious,
    setActiveStep,
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
            <Step
              flexFlow="column"
              wordBreak="break-words"
              h="100%"
              key={index}
            >
              <StepIndicator>
                <StepStatus
                  complete={isAppError ? <BsX /> : <StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle style={{ fontWeight: "bold" }}>
                  <Text>{step.title}</Text>
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
      <Flex
        flexGrow={"1"}
        {...(isAppError && { justifyContent: "center" })}
        overflow={"hidden"}
        mx="1rem"
      >
        {isAppError && (
          <Stack justifyContent={"space-evenly"}>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Um Erro Ocorreu!</AlertTitle>
              <AlertDescription>
                {errorMessage === "" ? "Erro desconhecido!" : errorMessage}
              </AlertDescription>
            </Alert>
            {errorPodeRetornar && (
              <Button
                colorScheme="red"
                onClick={() => {
                  removerAppError();
                  stepProps.goToPrevious();
                }}
              >
                Voltar
              </Button>
            )}
          </Stack>
        )}
        {activeStep === StepsAutocontratacao.CONSULTA_SALDO && !isAppError && (
          <ConsultaSaldoComponent {...stepProps} />
        )}
        {activeStep === StepsAutocontratacao.SELECAO_SAQUE && !isAppError && (
          <SelecaoSaqueComponent {...stepProps} />
        )}
        {activeStep === StepsAutocontratacao.CADASTRO_DADOS_PESSOAIS &&
          !isAppError && <CadastroDadosPessoaisComponent {...stepProps} />}
        {activeStep === StepsAutocontratacao.CONFIRMACAO && !isAppError && (
          <ConfirmacaoComponent {...stepProps} />
        )}
      </Flex>
    </Layout>
  );
}
