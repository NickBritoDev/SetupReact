import {
  Button,
  FormControl,
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
import { useMemo } from "react";
import { useFormik } from "formik";
import { formatNumber } from "@utils/mask/mascaras";
import { IBodyEnvioSimulacaoParcelas } from "../../types/hooks";

export default function SelecaoSaqueComponent(props: IStepProps) {
  const {
    state: { cpf, isAppError },
    dispatch: { atualizarParcelasSelecionadasSaque },
  } = useAutocontratacao();

  const { data, isLoading } = useGetConsultarSaldo(cpf, props.currentIndex);

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

  const parcelas = useMemo<{
    primeiraData: string;
    ultimaData: string;
    valorSomado: number;
    parcelas: IBodyEnvioSimulacaoParcelas;
  }>(() => {
    const values: IBodyEnvioSimulacaoParcelas = [] as any;
    let primeiraData = "";
    let ultimaData = "";
    let valorSomado = 0;

    for (let i = START; i <= 10; i++) {
      const retorno = data?.retorno;
      if (!retorno) {
        continue;
      }
      const valorKey = `valor_${i}` as keyof typeof retorno;
      const dataRepasseKey = `dataRepasse_${i}` as keyof typeof retorno;

      if (!retorno || !retorno[valorKey] || !retorno[dataRepasseKey]) {
        continue;
      }
      let valor = "0";

      const dataRepasse = data.retorno[dataRepasseKey];

      if (i === START) {
        primeiraData = dataRepasse;
        ultimaData = dataRepasse;
      }

      if (formik.values.anosSelecionados >= i) {
        valor = data.retorno[valorKey];
        ultimaData = dataRepasse;
      }

      valorSomado += Number(valor);

      values.push({
        [valorKey]: valor,
        [dataRepasseKey]: dataRepasse,
      } as any);
    }

    return {
      primeiraData,
      ultimaData,
      valorSomado,
      parcelas: values,
    };
  }, [data?.retorno, formik.values.anosSelecionados]);

  function handleSubmit() {
    atualizarParcelasSelecionadasSaque(
      parcelas.parcelas,
      formik.values.anosSelecionados,
    );
    props.goToNext();
  }

  const isLoaded = !isLoading;

  return (
    <form
      style={{ width: "100%", height: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <Stack
        w={"100%"}
        h="100%"
        hidden={isAppError}
        justifyContent="space-between"
      >
        <Skeleton isLoaded={isLoaded}>
          <FormControl mt="20px">
            <HStack
              display={"flex"}
              justifyContent="center"
              w={"100%"}
              px={"30px"}
            >
              <Button
                {...getDecrementButtonProps()}
                size="lg"
                colorScheme="green"
              >
                -
              </Button>
              <Input {...getInputProps()} w={"80%"} size="lg" readOnly />
              <Button
                {...getIncrementButtonProps()}
                size="lg"
                colorScheme="green"
              >
                +
              </Button>
            </HStack>
          </FormControl>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Stack
            justifyContent="space-evenly"
            textAlign="center"
            fontSize="x-large"
          >
            <Text>R$ {formatNumber(parcelas.valorSomado)}</Text>
            <Text>
              {parcelas.primeiraData}{" "}
              {parcelas.primeiraData !== parcelas.ultimaData ? (
                <>à {parcelas.ultimaData}</>
              ) : null}
            </Text>
          </Stack>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Button w={"100%"} type="submit" colorScheme="green">
            Confirmar
          </Button>
        </Skeleton>
      </Stack>
    </form>
  );
}