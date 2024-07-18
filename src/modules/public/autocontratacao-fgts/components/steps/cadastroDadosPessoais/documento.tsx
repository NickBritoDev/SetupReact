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

export default function CadastroDocumentoComponent({
  formik,
}: StepsDadosPessoaisProps) {
  const estados = useGetOptions("estados");
  const orgaosEmissores = useGetOptions("orgaos-emissores");

  return (
    <Stack flexGrow={"1"}>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.rg && formik.touched.rg}
      >
        <FormLabel>Documento</FormLabel>
        <Input
          autoFocus
          placeholder="Documento"
          {...formik.getFieldProps("rg")}
        />
        <FormErrorMessage>{formik.errors.rg}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.errors.estado_rg && formik.touched.estado_rg}
      >
        <FormLabel>Estado Emissor</FormLabel>
        <Select placeholder="Selecione" {...formik.getFieldProps("estado_rg")}>
          {estados.data &&
            estados.data.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.text}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.orgao_emissor}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.errors.orgao_emissor && formik.touched.orgao_emissor
        }
      >
        <FormLabel>Órgão Emissor</FormLabel>
        <Select
          placeholder="Selecione"
          {...formik.getFieldProps("orgao_emissor")}
        >
          {orgaosEmissores.data &&
            orgaosEmissores.data.map((orgao) => (
              <option key={orgao.value} value={orgao.value}>
                {orgao.value} - {orgao.text}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.orgao_emissor}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.errors.data_expedicao && formik.touched.data_expedicao
        }
      >
        <FormLabel>Data Expedição</FormLabel>
        <Input
          placeholder="01/01/2020"
          type="date"
          {...formik.getFieldProps("data_expedicao")}
        />
        <FormErrorMessage>{formik.errors.data_expedicao}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.errors.estado_natural && formik.touched.estado_natural
        }
      >
        <FormLabel>Estado Nascimento</FormLabel>
        <Select
          placeholder="Selecione"
          {...formik.getFieldProps("estado_natural")}
        >
          {estados.data &&
            estados.data.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.text}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.estado_natural}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.errors.cidade_natural && formik.touched.cidade_natural
        }
      >
        <FormLabel>Cidade Nascimento</FormLabel>
        <Input
          placeholder="Cidade Nascimento"
          {...formik.getFieldProps("cidade_natural")}
        />
        <FormErrorMessage>{formik.errors.cidade_natural}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={
          !!formik.errors.nacionalidade && formik.touched.nacionalidade
        }
        isRequired
      >
        <FormLabel>Nacionalidade</FormLabel>
        <Select
          placeholder="Selecione"
          {...formik.getFieldProps("nacionalidade")}
        >
          <option value="1">Brasileiro</option>
          <option value="2">Estrangeiro</option>
        </Select>
        <FormErrorMessage>{formik.errors.nacionalidade}</FormErrorMessage>
      </FormControl>
      <FormControl
        hidden={Number(formik.values.nacionalidade) !== 2}
        isReadOnly={Number(formik.values.nacionalidade) !== 2}
        isRequired={Number(formik.values.nacionalidade) === 2}
        isInvalid={!!formik.errors.pais_origem && formik.touched.pais_origem}
      >
        <FormLabel>País de Origem</FormLabel>
        <Input
          placeholder="País de Origem"
          {...formik.getFieldProps("pais_origem")}
        />
        <FormErrorMessage>{formik.errors.pais_origem}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
