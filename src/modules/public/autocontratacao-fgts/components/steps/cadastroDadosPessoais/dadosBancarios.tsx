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
import { handleChangeReal } from "@utils/mask/mascaras";

export default function CadastroDadosBancariosComponent({
  formik,
}: StepsDadosPessoaisProps) {
  const valoresPatrimonio = useGetOptions("valores-patrimoniais");

  return (
    <Stack flexGrow="1">
      <FormControl
        isRequired
        isInvalid={!!formik.errors.renda && formik.touched.renda}
      >
        <FormLabel>Renda</FormLabel>
        <Input
          autoFocus
          placeholder="Renda"
          name="renda"
          inputMode="decimal"
          onChange={handleChangeReal(formik.handleChange)}
          value={formik.values.renda}
        />
        <FormErrorMessage>{formik.errors.renda}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.errors.valor_patrimonio && formik.touched.valor_patrimonio
        }
      >
        <FormLabel>Valor Patrimônio</FormLabel>
        <Select
          placeholder="Selecione"
          {...formik.getFieldProps("valor_patrimonio")}
        >
          {valoresPatrimonio.data &&
            valoresPatrimonio.data.map((valor) => (
              <option key={valor.value} value={valor.value}>
                {valor.text}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.valor_patrimonio}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.banco && formik.touched.banco}
      >
        <FormLabel>Banco</FormLabel>
        <Input placeholder="Banco" {...formik.getFieldProps("banco")} />
        <FormErrorMessage>{formik.errors.banco}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.agencia && formik.touched.agencia}
      >
        <FormLabel>Agência</FormLabel>
        <Input
          placeholder="Agência"
          inputMode="numeric"
          {...formik.getFieldProps("agencia")}
        />
        <FormErrorMessage>{formik.errors.agencia}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.tipo_conta && formik.touched.tipo_conta}
      >
        <FormLabel>Tipo de Conta</FormLabel>
        <Select placeholder="Selecione" {...formik.getFieldProps("tipo_conta")}>
          <option value="C">Conta Corrente</option>
          <option value="P">Conta Poupança</option>
        </Select>
        <FormErrorMessage>{formik.errors.tipo_conta}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.conta && formik.touched.conta}
      >
        <FormLabel>Conta</FormLabel>
        <Input placeholder="Conta" {...formik.getFieldProps("conta")} />
        <FormErrorMessage>{formik.errors.conta}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
