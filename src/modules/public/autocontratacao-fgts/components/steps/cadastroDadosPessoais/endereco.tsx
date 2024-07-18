import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useGetOptions } from "@modules/public/autocontratacao-fgts/hooks/useGetOptions";
import { StepsDadosPessoaisProps } from "@modules/public/autocontratacao-fgts/types/steps";
import { handleChangeCEP } from "@utils/mask/mascaras";

export default function CadastroEnderecoComponent({
  formik,
}: StepsDadosPessoaisProps) {
  const estados = useGetOptions("estados");

  return (
    <Stack flexGrow="1">
      <FormControl
        isRequired
        isInvalid={!!formik.errors.cep && formik.touched.cep}
      >
        <FormLabel>CEP</FormLabel>
        <Input
          autoFocus
          placeholder="00000-000"
          inputMode="numeric"
          name="cep"
          onChange={handleChangeCEP(formik.handleChange)}
        />
        <FormErrorMessage>{formik.errors.cep}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.endereco && formik.touched.endereco}
      >
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
      <FormControl
        isRequired
        isInvalid={!!formik.errors.estado && formik.touched.estado}
      >
        <FormLabel>Estado</FormLabel>
        <Select placeholder="Selecione" {...formik.getFieldProps("estado")}>
          {estados.data &&
            estados.data.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.text}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.estado}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.cidade && formik.touched.cidade}
      >
        <FormLabel>Cidade</FormLabel>
        <Input placeholder="Cidade" {...formik.getFieldProps("cidade")} />
        <FormErrorMessage>{formik.errors.cidade}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.bairro && formik.touched.bairro}
      >
        <FormLabel>Bairro</FormLabel>
        <Input placeholder="Bairro" {...formik.getFieldProps("bairro")} />
        <FormErrorMessage>{formik.errors.bairro}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
