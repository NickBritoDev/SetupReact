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
import { handleChangeTelefone } from "@utils/mask/mascaras";
import { useEffect, useRef } from "react";

export default function CadastroDadosPessoaisComponent({
  formik,
}: StepsDadosPessoaisProps) {
  const estadoCivil = useGetOptions("estados-civis");
  const firstInputRef = useRef<any>(null);
  useEffect(() => {
    firstInputRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [firstInputRef]);

  return (
    <Stack overflowY={"auto"} flexGrow={"1"}>
      <FormControl
        ref={firstInputRef}
        isRequired
        isInvalid={!!formik.errors.nome && formik.touched.nome}
      >
        <FormLabel>Nome</FormLabel>
        <Input placeholder="Nome" {...formik.getFieldProps("nome")} />
        <FormErrorMessage>{formik.errors.nome}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.sexo && formik.touched.sexo}
      >
        <FormLabel>Sexo</FormLabel>
        <Select placeholder="Selecione" {...formik.getFieldProps("sexo")}>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </Select>
        <FormErrorMessage>{formik.errors.sexo}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.estado_civil && formik.touched.estado_civil}
      >
        <FormLabel>Estado Civil</FormLabel>
        <Select
          placeholder="Selecione"
          {...formik.getFieldProps("estado_civil")}
        >
          {estadoCivil.data &&
            estadoCivil.data.map((estadoCivil) => (
              <option key={estadoCivil.value} value={estadoCivil.value}>
                {estadoCivil.text}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.estado_civil}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.errors.data_nascimento && formik.touched.data_nascimento
        }
      >
        <FormLabel>Data Nascimento</FormLabel>
        <Input
          placeholder="01/01/2020"
          type="date"
          {...formik.getFieldProps("data_nascimento")}
        />
        <FormErrorMessage>{formik.errors.data_nascimento}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.celular && formik.touched.celular}
      >
        <FormLabel>Celular</FormLabel>
        <Input
          type="tel"
          placeholder="(00) 90000-0000"
          name="celular"
          inputMode="tel"
          onChange={handleChangeTelefone(formik.handleChange)}
          value={formik.values.celular}
        />
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.nome_mae && formik.touched.nome_mae}
      >
        <FormLabel>Nome da Mãe</FormLabel>
        <Input
          placeholder="Nome da Mãe"
          {...formik.getFieldProps("nome_mae")}
        />
        <FormErrorMessage>{formik.errors.nome_mae}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.nome_pai && formik.touched.nome_pai}
      >
        <FormLabel>Nome do Pai</FormLabel>
        <Input
          placeholder="Nome do Pai"
          {...formik.getFieldProps("nome_pai")}
        />
        <FormErrorMessage>{formik.errors.nome_pai}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
