import BackgroundComponent from "./components/background";
import FormComponent from "./components/form";
import { Flex } from "@chakra-ui/react";

export default function Login() {
  const back =
    "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <Flex
      h={"100vh"}
      w={"100%"}
      p={4}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <BackgroundComponent back={back} />
      <FormComponent />
    </Flex>
  );
}
