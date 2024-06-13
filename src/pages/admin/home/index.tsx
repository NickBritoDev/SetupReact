import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box>
      <Text>Home</Text>
      <Button
        onClick={() => {
          navigate("/admin/perfil");
        }}
      >
        Ir para Perfil
      </Button>
    </Box>
  );
}
