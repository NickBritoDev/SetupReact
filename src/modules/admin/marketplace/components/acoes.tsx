import { Flex } from "@chakra-ui/react";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import FiltrosComponent from "./filtros";
import GrupoConfiancaComponent from "./grupoConfianca";
import { FiltrosType } from "../types/types";

export default function AcoesComponents({ onApplyFilters }: FiltrosType) {
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      p={4}
      gap={useMobile() ? 2 : 4}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={useMobile() ? 2 : 4}
      >
        <GrupoConfiancaComponent />
        <FiltrosComponent onApplyFilters={onApplyFilters} />
      </Flex>
    </Flex>
  );
}
