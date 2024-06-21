import { Box, Flex } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();
  return (
    <Box
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex></Flex>
      <Flex></Flex>
    </Box>
  );
}
