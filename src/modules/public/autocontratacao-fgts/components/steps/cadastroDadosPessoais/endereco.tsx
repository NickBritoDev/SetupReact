import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import {
  IConsultaCep,
  IConsultaCepErro,
  useGetConsultaCep,
} from "../../../../../../hooks/useGetConsultaCep";
import { useGetOptions } from "@modules/public/autocontratacao-fgts/hooks/useGetOptions";
import { StepsDadosPessoaisProps } from "@modules/public/autocontratacao-fgts/types/steps";
import { handleChangeCEP } from "@utils/mask/mascaras";
import { useEffect, useState } from "react";

export default function CadastroEnderecoComponent({
  formik,
}: StepsDadosPessoaisProps) {
  const estados = useGetOptions("estados");
  const [cepError, setCepError] = useState(false);

  const cep = useGetConsultaCep(formik.values.cep);

  useEffect(() => {
    const body = cep.data as IConsultaCep | IConsultaCepErro;
    formik.setFieldValue("endereco", "");
    formik.setFieldValue("complemento", "");
    formik.setFieldValue("bairro", "");
    formik.setFieldValue("cidade", "");
    formik.setFieldValue("estado", "");
    if (cep.isSuccess) {
      setCepError("erro" in body);
      if (!("erro" in body)) {
        formik.setFieldValue("endereco", body?.logradouro, true);
        formik.setFieldValue("complemento", body?.complemento, true);
        formik.setFieldValue("bairro", body?.bairro, true);
        formik.setFieldValue("cidade", body?.localidade, true);
        formik.setFieldValue("estado", body?.uf, true);
      }
    }
  }, [cep.data]);

  return (
    <Stack flexGrow="1">
      <FormControl isRequired isInvalid={!!formik.errors.cep || cepError}>
        <FormLabel>CEP</FormLabel>
        <Input
          autoFocus
          placeholder="00000-000"
          inputMode="numeric"
          name="cep"
          onChange={handleChangeCEP(formik.handleChange)}
        />
        <FormErrorMessage>
          {formik.errors.cep ?? "Cep Inválido"}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isReadOnly>
        <FormLabel>Endereço</FormLabel>
        <Input placeholder="Endereço" {...formik.getFieldProps("endereco")} />
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.numero && formik.touched.numero}
      >
        <FormLabel>Número</FormLabel>
        <Input
          type="number"
          placeholder="0"
          {...formik.getFieldProps("numero")}
        />
        <FormErrorMessage>{formik.errors.numero}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formik.errors.complemento && formik.touched.complemento}
      >
        <FormLabel>Complemento</FormLabel>
        <Input
          placeholder="Complemento"
          {...formik.getFieldProps("complemento")}
        />
        <FormErrorMessage>{formik.errors.complemento}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isReadOnly>
        <FormLabel>Estado</FormLabel>
        <Select isReadOnly {...formik.getFieldProps("estado")}>
          {estados.data &&
            estados.data
              .filter((estado) => estado.value === formik.values.estado)
              .map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.text}
                </option>
              ))}
        </Select>
        <FormErrorMessage>{formik.errors.estado}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isReadOnly>
        <FormLabel>Cidade</FormLabel>
        <Input placeholder="Cidade" {...formik.getFieldProps("cidade")} />
        <FormErrorMessage>{formik.errors.cidade}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isReadOnly>
        <FormLabel>Bairro</FormLabel>
        <Input placeholder="Bairro" {...formik.getFieldProps("bairro")} />
        <FormErrorMessage>{formik.errors.bairro}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
