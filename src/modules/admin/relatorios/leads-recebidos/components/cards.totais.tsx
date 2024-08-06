import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FcApproval } from "react-icons/fc";
import { GiIceCube } from "react-icons/gi";
import { SiFireship } from "react-icons/si";

export default function CardsTotaisComponent({ dataRelatorio }: any) {
  return (
    <Grid mb={4} templateColumns='repeat(4, 1fr)' gap={6}>
      <GridItem w='100%' boxShadow={'2xl'} rounded={'xl'} p={4} >
        <Flex mb={2} borderBottom={'1px solid #67e7f0'} w={'100%'} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={20} fontWeight={'bold'}>Leads Frios</Text>
          <Text fontWeight={'semibold'}>
            {dataRelatorio?.variacoes?.pct_frio}
          </Text>
        </Flex>
        <Flex w={'100%'} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={22} fontWeight={'semibold'}>
            {dataRelatorio?.totais?.totalFrio}
          </Text>
          <GiIceCube size={42} color="#67e7f0" />
        </Flex>
      </GridItem>

      <GridItem w='100%' boxShadow={'2xl'} rounded={'xl'} p={4} >
        <Flex mb={2} borderBottom={'1px solid orange'} w={'100%'} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={20} fontWeight={'bold'}>Leads Médios</Text>
          <Text fontWeight={'semibold'}>
            {dataRelatorio?.variacoes?.pct_medio}
          </Text>
        </Flex>
        <Flex w={'100%'} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={22} fontWeight={'semibold'}>
            {dataRelatorio?.totais?.totalMedio}
          </Text>
          <FaTemperatureArrowUp size={40} color="orange" />
        </Flex>
      </GridItem>

      <GridItem w='100%' boxShadow={'2xl'} rounded={'xl'} p={4} >
        <Flex mb={2} borderBottom={'1px solid #e82f12'} w={'100%'} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={20} fontWeight={'bold'}>Leads Quentes</Text>
          <Text fontWeight={'semibold'}>
            {dataRelatorio?.variacoes?.pct_quente}
          </Text>
        </Flex>
        <Flex w={'100%'} alignItems={"flexe"} justifyContent={"space-between"}>
          <Text fontSize={22} fontWeight={'semibold'}>
            {dataRelatorio?.totais?.totalQuente}
          </Text>
          <SiFireship size={40} color="#e82f12" />
        </Flex>
      </GridItem>

      <GridItem w='100%' boxShadow={'2xl'} rounded={'xl'} p={4} >
        <Flex mb={2} borderBottom={'1px solid #229544'} w={'100%'} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={20} fontWeight={'bold'}>Leads Total</Text>
          <Text fontWeight={'semibold'}>
            100%
          </Text>
        </Flex>
        <Flex w={'100%'} alignItems={"flexe"} justifyContent={"space-between"}>
          <Text fontSize={22} fontWeight={'semibold'}>
            {dataRelatorio?.totais?.total}
          </Text>
          <FcApproval size={42} />
        </Flex>
      </GridItem>
    </Grid>
  )
}