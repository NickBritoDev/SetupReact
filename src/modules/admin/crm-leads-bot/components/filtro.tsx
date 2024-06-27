import {
  Button,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Checkbox,
  Avatar,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { FcFilledFilter } from "react-icons/fc";
import { BsFire } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useMobile } from "../../../../helpers/responsividade/useMediaQuery";
import { MdLogout } from "react-icons/md";
import { FaTemperatureArrowUp, FaUserPlus } from "react-icons/fa6";
import { SiFireship } from "react-icons/si";
import { GiIceCube } from "react-icons/gi";
import { FiltrosTypes } from "../types/types";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";

export default function FiltroComponent({
  filterStatus,
  filterScore,
  toggleFilterScore,
  onClose,
  toggleFilterStatus,
}: FiltrosTypes) {
  const { data } = useGetMinhaConta();

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      boxShadow={"sm"}
      p={2}
      h={"8vh"}
      w={"100%"}
      pos={"absolute"}
      top={0}
      left={0}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"24.8%"}
        borderRight={"solid 1px gray"}
      >
        <Menu>
          <Tooltip hasArrow label="Filtros de leads" placement="right">
            <MenuButton w={"100%"} as={Button} colorScheme="transparent">
              <Flex
                w={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text
                  ml={-4}
                  color={"black"}
                  fontWeight={"semibold"}
                  fontSize={18}
                >
                  Filtros
                </Text>
                <FcFilledFilter size={22} />
              </Flex>
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuGroup w={"280px"} title="SCORE">
              {["Frio", "Médio", "Quente"].map((score) => (
                <MenuItem key={score}>
                  <Checkbox
                    colorScheme="green"
                    isChecked={filterScore[score]}
                    onChange={() => toggleFilterScore(score)}
                  >
                    <Flex
                      w={"280px"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text fontWeight={"semibold"}>LEAD {score}</Text>
                      {score === "Frio" && (
                        <GiIceCube color="#44B3CF" size={22} />
                      )}
                      {score === "Médio" && (
                        <FaTemperatureArrowUp color="#F4B61D" size={22} />
                      )}
                      {score === "Quente" && (
                        <SiFireship color="#F44B1D" size={22} />
                      )}
                    </Flex>
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="STATUS">
              {["Novo", "Contato", "Negociando", "Finalizado"].map((status) => (
                <MenuItem key={status}>
                  <Checkbox
                    colorScheme="green"
                    isChecked={filterStatus[status]}
                    onChange={() => toggleFilterStatus(status)}
                  >
                    <Flex
                      w={"280px"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text fontWeight={"semibold"}>{status}</Text>
                      {status === "Novo" && (
                        <FaUserPlus color="#44B3CF" size={22} />
                      )}
                      {status === "Contato" && (
                        <BiSolidPhoneCall color="#F4B61D" size={22} />
                      )}
                      {status === "Negociando" && (
                        <BsFire color="#F44B1D" size={22} />
                      )}
                      {status === "Finalizado" && (
                        <TbRosetteDiscountCheckFilled
                          color="#229544"
                          size={22}
                        />
                      )}
                    </Flex>
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>

      <Wrap>
        <WrapItem
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Avatar size={"sm"} name={data?.nome} src={data?.foto} />

          <Flex
            display={useMobile() ? "none" : "flex"}
            flexDir={"column"}
            alignItems={"flex-end"}
            justifyContent={"center"}
          >
            <Text fontWeight={"semibold"}>{data?.nome}</Text>
            <Text
              color={"brand.invert_color_subtitle"}
              fontWeight={"semibold"}
              fontSize={14}
              mt={-2}
            >
              {data.cnpjMatriz}
            </Text>
          </Flex>

          <Tooltip mr={-4} hasArrow label="Voltar" placement="right">
            <Button
              onClick={onClose}
              color={"brand.invert_colors"}
              _hover={{ transform: "translateX(5px)" }}
              colorScheme="transparent"
              bg={"none"}
            >
              <MdLogout size={24} />
            </Button>
          </Tooltip>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}
