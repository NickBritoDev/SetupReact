import { Box } from "@chakra-ui/react";
import BannerComponent from "./components/banner";

export default function Home() {
  return (
    <Box
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <BannerComponent />
    </Box>
  );
}
