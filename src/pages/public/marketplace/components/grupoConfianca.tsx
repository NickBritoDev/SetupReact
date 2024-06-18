import { Button, Text, Tooltip } from "@chakra-ui/react";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import { FcGoodDecision } from "react-icons/fc";

export default function GrupoConfiancaComponent() {
  return (
    <Tooltip placement="left" hasArrow label={"Criar grupos de permissões"}>
      <Button
        _hover={{ backgroundColor: "gray.600", color: "white" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Text display={useMobile() ? "none" : ""}>
          Criar grupo de confiança
        </Text>
        <FcGoodDecision size={22} />
      </Button>
    </Tooltip>
  );
}
