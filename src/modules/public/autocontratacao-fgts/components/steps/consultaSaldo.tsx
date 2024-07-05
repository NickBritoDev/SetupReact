import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { maskCPF } from "@utils/mask/mascaras";
import { IStepProps } from "../../types/steps";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAutocontratacao } from "../../context/context";
import { useDesktop } from "@helpers/responsividade/useMediaQuery";

export default function ConsultaSaldoComponent(props: IStepProps) {
  const {
    dispatch: { atualizarCpf },
  } = useAutocontratacao();

  const isDesktop = useDesktop();

  const consultaSchema = yup.object({
    cpf: yup
      .string()
      .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}/, "CPF Inválido")
      .required("CPF Inválido"),
  });

  const formik = useFormik({
    validationSchema: consultaSchema,
    initialValues: {
      cpf: "",
    },
    onSubmit: ({ cpf }) => {
      atualizarCpf(cpf);
      props.goToNext();
    },
    validateOnBlur: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "100%", height: "100%" }}
    >
      <Flex
        flexDir={"column"}
        justify={"center"}
        gap={"5rem"}
        w={"100%"}
        h={"100%"}
        paddingX={isDesktop ? "8rem" : "3rem"}
      >
        <FormControl isInvalid={!!formik.errors.cpf}>
          <FormLabel htmlFor="cpf">Digite o CPF</FormLabel>
          <Input
            id="cpf"
            value={formik.values.cpf}
            type="text"
            inputMode="numeric"
            onChange={(e) => {
              e.target.value = maskCPF(e.target.value);
              formik.handleChange(e);
            }}
            borderColor={formik.errors.cpf ? "red" : "gray.300"}
            size={"lg"}
          />
          <FormErrorMessage>{formik.errors.cpf}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="green" type="submit">
          Consultar
        </Button>
      </Flex>
    </form>
  );
}
