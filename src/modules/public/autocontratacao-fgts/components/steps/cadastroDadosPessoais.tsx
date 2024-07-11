import {
  Button,
  Flex,
  HStack,
  Progress,
  Stack,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { IStepProps, StepsDadosPessoaisProps } from "../../types/steps";
import DadosPessoaisComponent from "./cadastroDadosPessoais/dadosPessoais";
import EnderecoComponent from "./cadastroDadosPessoais/endereco";
import DocumentoComponent from "./cadastroDadosPessoais/documento";
import DadosBancariosComponent from "./cadastroDadosPessoais/dadosBancarios";
import { IDadosCliente } from "../../context/state";
import { useDadosClienteFormik } from "./cadastroDadosPessoais/formik";
import { useAutocontratacao } from "../../context/context";

export default function CadastroDadosPessoaisComponent(props: IStepProps) {
  const {
    dispatch: { atualizarDadosCliente },
  } = useAutocontratacao();
  const steps = [
    {
      title: "Dados Pessoais",
    },
    {
      title: "Endereço",
    },
    {
      title: "Documento",
    },
    {
      title: "Dados Bancarios",
    },
  ];
  function onSubmit(data: IDadosCliente) {
    atualizarDadosCliente(data);
    props.goToNext();
  }

  const formik = useDadosClienteFormik(onSubmit);

  const {
    activeStep,
    goToPrevious: goToPrev,
    goToNext,
  } = useSteps({
    index: 1,
    count: steps.length,
  });

  function goToPrevious() {
    if (activeStep === 1) {
      props.goToPrevious();
      return;
    }

    goToPrev();
  }

  async function validateAndGoToNext() {
    let isValid = false;
    const validationStep: Record<number, Array<keyof IDadosCliente>> = {
      1: [
        "nome",
        "sexo",
        "estado_civil",
        "data_nascimento",
        "celular",
        "nome_mae",
        "nome_pai",
      ],
      2: [
        "cep",
        "endereco",
        "numero",
        "complemento",
        "estado",
        "cidade",
        "bairro",
      ],
      3: [
        "rg",
        "estado_rg",
        "orgao_emissor",
        "data_expedicao",
        "estado_natural",
        "cidade_natural",
        "nacionalidade",
        "pais_origem",
      ],
      4: [
        "renda",
        "valor_patrimonio",
        "banco",
        "agencia",
        "tipo_conta",
        "conta",
      ],
    };

    if (activeStep in validationStep) {
      const fields = validationStep[activeStep];

      const touchedConfig = fields.reduce(
        (prev, curr) => ({ ...prev, [curr]: true }),
        {},
      );

      await formik.setTouched(touchedConfig, true);

      const errors = Object.entries(formik.errors).filter(([nomeCampo]) =>
        fields.includes(nomeCampo as keyof IDadosCliente),
      );

      isValid = errors.length === 0;
    }

    if (isValid) {
      return goToNext();
    }
  }

  const activeStepPercent = (activeStep / steps.length) * 100;

  const stepProps: StepsDadosPessoaisProps = {
    formik,
  };

  return (
    <Stack w="100%" flexGrow="1" overflow={"hidden"}>
      <Progress
        value={activeStepPercent}
        height="3px"
        width="100%"
        colorScheme="green"
        top="10px"
      />
      <Text fontSize="x-large" mt="1rem" textAlign="center">
        {steps[activeStep - 1].title}
      </Text>
      <form
        style={{
          display: "flex",
          padding: "20px",
          gap: "1rem",
          width: "100%",
          flexGrow: "1",
          flexDirection: "column",
          overflowX: "hidden",
          overflowY: "auto",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Flex flexGrow={"1"} w="100%">
          {activeStep === 1 && <DadosPessoaisComponent {...stepProps} />}
          {activeStep === 2 && <EnderecoComponent {...stepProps} />}
          {activeStep === 3 && <DocumentoComponent {...stepProps} />}
          {activeStep === 4 && <DadosBancariosComponent {...stepProps} />}
        </Flex>
        <HStack>
          <Button w="50%" disabled={activeStep === 1} onClick={goToPrevious}>
            Voltar
          </Button>
          {activeStep === steps.length && (
            <Button
              w="50%"
              onClick={() => formik.submitForm()}
              colorScheme="blue"
            >
              {" "}
              Cadastrar
            </Button>
          )}
          {activeStep !== steps.length && (
            <Button
              w="50%"
              onClick={async () => await validateAndGoToNext()}
              colorScheme="green"
            >
              Avançar
            </Button>
          )}
        </HStack>
      </form>
    </Stack>
  );
}