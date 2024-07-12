import {
  Divider,
  Heading,
  Stack,
  Text,
  Mark,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IStepProps } from "../../types/steps";
import { useAutocontratacao } from "../../context/context";
import { formatNumber } from "@utils/mask/mascaras";
import {
  DadosPessoaisNacionalidadeV1,
  DadosPessoaisSexoV1,
} from "../../types/hooks";
import { enumNameByValue } from "@helpers/enums/enums";
import { useGetOptions } from "../../hooks/useGetOptions";
import { Fragment } from "react/jsx-runtime";
import { StepsAutocontratacao } from "../../helpers/config";
import { IConfigEditar } from "../../context/state";
import { PropsWithChildren, useState } from "react";
import { usePostCadastrarProposta } from "../../hooks/usePostCadastrarProposta";

function HighlightCampo({ children }: PropsWithChildren) {
  return (
    <Mark fontWeight="bold" textDecoration="underline">
      {children}
    </Mark>
  );
}

export default function ConfirmacaoComponent(props: IStepProps) {
  const [canCadastrar, setCanCadastrar] = useState(false);

  const {
    state: { dadosPessoais, parcelasSelecionadasSaque },
    dispatch: { definirEditarCampos },
  } = useAutocontratacao();
  const selecionadas = parcelasSelecionadasSaque!.reduce(
    (prev, curr, index) => {
      const valorKey = `valor_${index + 1}` as keyof typeof curr;
      const dataRepasseKey = `dataRepasse_${index + 1}` as keyof typeof curr;
      const data = {
        ...prev,
      };

      const valor = parseFloat(curr[valorKey]);
      const dataRepasse = curr[dataRepasseKey];
      if (index === 0) {
        data.dataInicio = dataRepasse;
      }

      data.valorTotal += valor;

      if (valor) {
        data.dataFim = dataRepasse;
      }

      return data;
    },
    {
      valorTotal: 0,
      dataInicio: "",
      dataFim: "",
    },
  );

  usePostCadastrarProposta(canCadastrar);
  const estadosCivis = useGetOptions("estados-civis");
  const valorPatrimonio = useGetOptions("valores-patrimoniais");
  const bancos = useGetOptions("bancos");

  const textFromGetOptions = (
    query: ReturnType<typeof useGetOptions>,
    value: any,
  ) => {
    return query.data?.find((obj) => obj.value === value)?.text;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  function redirectEdicao(index: StepsAutocontratacao, config?: IConfigEditar) {
    props.setActiveStep(index);

    definirEditarCampos(config ?? {});
  }

  function cadastrarProposta() {
    setCanCadastrar(true);
  }

  return (
    <Fragment>
      <Stack w="100%">
        <Heading>Confirmação</Heading>
        <Stack flexGrow={"1"} overflowY="auto" w="100%">
          <Heading size="md">Valores de Saque</Heading>
          <Stack ml="1rem">
            <Text>
              Valor Total:{" "}
              <HighlightCampo>
                R$ {formatNumber(selecionadas.valorTotal)}
              </HighlightCampo>
            </Text>
            <Text>
              <HighlightCampo>{selecionadas.dataInicio}</HighlightCampo>
              {selecionadas.dataInicio !== selecionadas.dataFim && (
                <>
                  {" "}
                  à <HighlightCampo>{selecionadas.dataFim}</HighlightCampo>
                </>
              )}
            </Text>
          </Stack>
          <Divider />
          <Heading size="md">Seus Dados</Heading>
          <Stack ml="1rem">
            <Heading size="sm">Dados pessoais</Heading>
            <Stack ml="1rem">
              <Text>
                <HighlightCampo>{dadosPessoais?.nome}</HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>
                  {enumNameByValue(DadosPessoaisSexoV1, dadosPessoais?.sexo)}
                </HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>
                  {textFromGetOptions(
                    estadosCivis,
                    dadosPessoais?.estado_civil,
                  )}
                </HighlightCampo>
              </Text>
              <Text>
                Nascido em{" "}
                <HighlightCampo>
                  {dadosPessoais?.data_nascimento}
                </HighlightCampo>
              </Text>
              <Text>
                Telefone Celular{" "}
                <HighlightCampo>{dadosPessoais?.celular}</HighlightCampo>
              </Text>
              <Text>
                Filho de{" "}
                <HighlightCampo>{dadosPessoais?.nome_mae}</HighlightCampo> e{" "}
                <HighlightCampo>{dadosPessoais?.nome_pai}</HighlightCampo>
              </Text>
            </Stack>
            <Divider />
            <Heading size="sm">Endereço</Heading>
            <Stack ml="1rem">
              <Text>
                CEP <HighlightCampo>{dadosPessoais?.cep}</HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>{dadosPessoais?.endereco} </HighlightCampo>,{" "}
                <HighlightCampo>{dadosPessoais?.numero}</HighlightCampo>
                {" - "}
                <HighlightCampo>{dadosPessoais?.bairro}</HighlightCampo>
              </Text>
              {dadosPessoais?.complemento && (
                <Text>
                  <HighlightCampo>{dadosPessoais?.complemento}</HighlightCampo>
                </Text>
              )}
              <Text>
                <HighlightCampo>{dadosPessoais?.cidade}</HighlightCampo>,{" "}
                <HighlightCampo>{dadosPessoais?.estado}</HighlightCampo>
              </Text>
            </Stack>
            <Divider />
            <Heading size="sm">Documento</Heading>
            <Stack ml="1rem">
              <Text>
                <HighlightCampo>{dadosPessoais?.rg}</HighlightCampo> -{" "}
                <HighlightCampo>{dadosPessoais?.orgao_emissor}</HighlightCampo>/
                <HighlightCampo>{dadosPessoais?.estado_rg}</HighlightCampo>
              </Text>
              <Text>
                Emitido em{" "}
                <HighlightCampo>{dadosPessoais?.data_expedicao}</HighlightCampo>
              </Text>
              <Text>
                Natural de{" "}
                <HighlightCampo>
                  {dadosPessoais?.cidade_natural},{" "}
                  {dadosPessoais?.estado_natural}
                </HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>
                  {enumNameByValue(
                    DadosPessoaisNacionalidadeV1,
                    dadosPessoais?.nacionalidade,
                  )}
                </HighlightCampo>
              </Text>
              {dadosPessoais?.pais_origem && (
                <Text>
                  <HighlightCampo>{dadosPessoais.pais_origem}</HighlightCampo>
                </Text>
              )}
            </Stack>
            <Divider />
            <Heading size="sm">Dados Bancários</Heading>
            <Stack ml="1rem">
              <Text>
                Renda de{" "}
                <HighlightCampo>R$ {dadosPessoais?.renda}</HighlightCampo>
              </Text>
              <Text>
                Patrimônio de{" "}
                <HighlightCampo>
                  {textFromGetOptions(
                    valorPatrimonio,
                    dadosPessoais?.valor_patrimonio,
                  )}
                </HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>
                  Banco {dadosPessoais?.banco} -{" "}
                  {textFromGetOptions(bancos, dadosPessoais?.banco)}
                </HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>
                  Agência {dadosPessoais?.agencia}
                </HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>Conta {dadosPessoais?.conta}</HighlightCampo>
              </Text>
              <Text>
                <HighlightCampo>
                  {dadosPessoais?.tipo_conta === "C"
                    ? "Conta Corrente"
                    : "Conta Poupança"}
                </HighlightCampo>
              </Text>
            </Stack>
            <HStack gap={"2rem"} px="1rem">
              <Button w="100%" colorScheme="blue" onClick={onOpen}>
                Editar
              </Button>
              <Button w="100%" colorScheme="green" onClick={cadastrarProposta}>
                Cadastrar
              </Button>
            </HStack>
          </Stack>
          <Divider />
        </Stack>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader>Editar Campos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              onClick={() => redirectEdicao(StepsAutocontratacao.SELECAO_SAQUE)}
            >
              Valor de Saque
            </Button>
            <Button
              onClick={() =>
                redirectEdicao(StepsAutocontratacao.CADASTRO_DADOS_PESSOAIS, {
                  stepDadosPessoais: 1,
                })
              }
            >
              Dados Pessoais
            </Button>
            <Button
              onClick={() =>
                redirectEdicao(StepsAutocontratacao.CADASTRO_DADOS_PESSOAIS, {
                  stepDadosPessoais: 2,
                })
              }
            >
              Endereço
            </Button>
            <Button
              onClick={() =>
                redirectEdicao(StepsAutocontratacao.CADASTRO_DADOS_PESSOAIS, {
                  stepDadosPessoais: 3,
                })
              }
            >
              Documento
            </Button>
            <Button
              onClick={() =>
                redirectEdicao(StepsAutocontratacao.CADASTRO_DADOS_PESSOAIS, {
                  stepDadosPessoais: 4,
                })
              }
            >
              Dados Bancários
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
