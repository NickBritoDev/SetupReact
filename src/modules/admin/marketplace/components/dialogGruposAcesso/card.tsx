import { IGruposAcesso } from "../../types/types";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Divider,
  Text,
  Flex,
} from "@chakra-ui/react";
import EditarComponent from "./editar";
import ExcluirComponent from "./excluir";
import AdicionarUsuarioComponent from "./adicionarUsuario";
import AdicionarPermissoesComponent from "./adicionarPermissoes";
import CardUsuarioComponent from "./cardUsuario";
import CardPermissaoComponent from "./cardPermissao";

type Props = IGruposAcesso & { cnpj: string };

export default function CardComponent(props: Props) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {props.nome}
          </Box>
          <ExcluirComponent {...props} />
          <EditarComponent {...props} />
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>
          Usuários <AdicionarUsuarioComponent {...props} />
        </Text>
        <Flex gap="5" my="3">
          {props.usuarios?.map((usuario) => (
            <CardUsuarioComponent
              key={usuario.id_acesso}
              {...usuario}
              idGrupo={props.id}
            />
          ))}
        </Flex>
        <Divider mb="3" />
        <Text>
          Permissões <AdicionarPermissoesComponent {...props} />
        </Text>
        <Flex gap="5" my="3">
          {props.permissoes?.map((permissao) => (
            <CardPermissaoComponent
              key={permissao.chave}
              {...permissao}
              idGrupo={props.id}
            />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
