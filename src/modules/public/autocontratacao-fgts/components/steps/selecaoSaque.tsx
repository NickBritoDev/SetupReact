import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { IStepProps } from "../../types/steps";
import { useGetConsultarSaldo } from "../../hooks/useGetConsultarSaldo";
import { useAutocontratacao } from "../../context/context";
import { useEffect } from "react";
import { useFormik } from "formik";
import { formatNumber } from "@utils/mask/mascaras";

export default function SelecaoSaqueComponent(props: IStepProps) {
  const {
    state: { cpf },
    dispatch: { definirAppError },
  } = useAutocontratacao();

  const { data, isLoading, isError, error } = useGetConsultarSaldo(
    cpf,
    props.currentIndex,
  );

  useEffect(() => {
    definirAppError(!isLoading && isError);
  }, [isLoading, isError]);

  if (isError) {
    return (
      <Stack w={"100%"} h={"50%"} px={"20px"} alignSelf={"center"}>
        <Alert h={"100%"} status="error">
          {error?.data.message}
        </Alert>
      </Stack>
    );
  }

  function handleSubmit(values: any) {
    console.log(values);
  }

  const formik = useFormik({
    initialValues: {
      anosSelecionados: 10,
    },
    onSubmit: handleSubmit,
  });

  const START = 1;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: formik.initialValues.anosSelecionados,
      min: START,
      max: 10,
      name: "anosSelecionados",
      id: "anosSelecionados",
      onChange: (_, anosSelecionados) => {
        formik.setValues({ anosSelecionados });
      },
      isRequired: true,
      clampValueOnBlur: true,
      keepWithinRange: true,
    });

  const values: { valor: string | number; dataRepasse: string }[] = [];
  let primeiraData = "";
  let ultimaData = "";
  let valorSomado = 0;

  for (let i = START; i <= 10; i++) {
    const retorno = data?.retorno;
    if (!retorno || (formik.values.anosSelecionados < i && i !== START)) {
      continue;
    }
    const valorKey = `valor_${i}` as keyof typeof retorno;
    const dataRepasseKey = `dataRepasse_${i}` as keyof typeof retorno;

    if (!retorno || !retorno[valorKey] || !retorno[dataRepasseKey]) {
      continue;
    }
    const valor = data.retorno[valorKey];
    const dataRepasse = data.retorno[dataRepasseKey];
    valorSomado += Number(valor);

    if (i === START) {
      primeiraData = dataRepasse;
    }

    ultimaData = dataRepasse;

    values.push({
      valor: valor,
      dataRepasse,
    });
  }

  return (
    <Skeleton isLoaded={!isLoading} w={"100%"}>
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={formik.handleSubmit}
      >
        <Stack w={"100%"} h="100%" justifyContent="space-between">
          <FormControl>
            <FormLabel>Anos Selecionados</FormLabel>
            <HStack
              display={"flex"}
              justifyContent="center"
              w={"100%"}
              px={"30px"}
            >
              <Button {...getDecrementButtonProps()} size="lg">
                -
              </Button>
              <Input {...getInputProps()} w={"80%"} size="lg" readOnly />
              <Button {...getIncrementButtonProps()} size="lg">
                +
              </Button>
            </HStack>
          </FormControl>
          <Stack
            justifyContent="space-evenly"
            textAlign="center"
            fontSize="x-large"
          >
            <Text>R$ {formatNumber(valorSomado)}</Text>
            <Text>
              {primeiraData}{" "}
              {primeiraData !== ultimaData ? <>à {ultimaData}</> : null}
            </Text>
          </Stack>
          <Button type="submit" colorScheme="green">
            Confirmar
          </Button>
        </Stack>
      </form>
    </Skeleton>
  );
}
