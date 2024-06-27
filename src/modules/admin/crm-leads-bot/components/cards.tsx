import { Box, Flex, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import crmData from "../../../../json/crm/data.json";

export default function CardsComponent() {
  return (
    <Flex gap={4} w={"100%"} alignItems={"center"} justifyContent={"center"}>
      {crmData[0].leads.map((data, index) => (
        <Box
          key={index}
          color={"white"}
          bg={
            data.status === "Novo"
              ? "#44B3CF"
              : data.status === "Contato"
                ? "#F4B61D"
                : data.status === "Negociando"
                  ? "#F44B1D"
                  : data.status === "Finalizado"
                    ? "#229544"
                    : "black"
          }
          borderRadius={"30px 30px 30px 0"}
          p={4}
          boxShadow={"lg"}
          w={"100%"}
        >
          <Text fontWeight={"bold"}>{data.status}</Text>
          <Flex
            w={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={22} fontWeight={"semibold"}>
              {data.quantidade === 0 ? `0${data.quantidade}` : data.quantidade}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              {data.status === "Novo" ? (
                <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                  <FaUserPlus size={30} />
                </Flex>
              ) : data.status === "Contato" ? (
                <BiSolidPhoneCall size={30} />
              ) : data.status === "Negociando" ? (
                <BsFire size={30} />
              ) : data.status === "Finalizado" ? (
                <TbRosetteDiscountCheckFilled size={30} />
              ) : null}
            </Flex>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
