import { Box, Flex, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useGetAcompanhamentoLeads } from "../hooks/useGetAcompanhamentoLeads";

const initialData = [
  {
    Novo: "8",
    Contato: "0",
    Finalizado: "0",
    Negociando: "0",
  },
];

export default function CardsComponent() {
  const { data: data_crm } = useGetAcompanhamentoLeads();
  const crm = data_crm ? data_crm : initialData;

  const leads = crm[0];

  const leadStatuses = [
    { status: "Novo", quantidade: leads.Novo },
    { status: "Pendente", quantidade: leads.Pendente },
    { status: "Concluído", quantidade: leads.Concluído },
    { status: "Em Aberto", quantidade: leads.Em_Aberto },
  ];

  return (
    <Flex gap={4} w={"100%"} alignItems={"center"} justifyContent={"center"}>
      {leadStatuses.map((data, index) => (
        <Box
          key={index}
          color={"white"}
          bg={
            data.status === "Novo"
              ? "#44B3CF"
              : data.status === "Pendente"
                ? "#F4B61D"
                : data.status === "Em Aberto"
                  ? "#F44B1D"
                  : data.status === "Concluído"
                    ? "#229544"
                    : "#d53dbc"
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
              {data.quantidade === "0"
                ? `0${data.quantidade}`
                : data.quantidade}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              {data.status === "Novo" ? (
                <FaUserPlus size={30} />
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
