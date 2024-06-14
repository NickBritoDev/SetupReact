// SidebarComponent.tsx
import {
  Button,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Box
} from "@chakra-ui/react";
import { useRef } from "react";
import { RiMenuFold4Fill, RiMenuUnfold2Fill } from "react-icons/ri";
import ToggleModeComponent from "./toggleMode";

export default function SidebarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Tooltip hasArrow label="Abrir menu" placement="left" ml={-2}>
        <Button
          color={"brand.invert_colors"}
          _hover={{ transform: "translateX(5px)" }}
          ref={btnRef}
          colorScheme="transparent"
          onClick={onOpen}
        >
          <RiMenuFold4Fill size={30} />
        </Button>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent pos={"relative"}>
          <Tooltip hasArrow label="Fechar menu" placement="right" ml={-3}>
            <Button
              w={"max-content"}
              color={"brand.invert_colors"}
              pos={"absolute"}
              top={2}
              right={8}
              _hover={{ transform: "translateX(-5px)" }}
              ref={btnRef}
              colorScheme="transparent"
              onClick={onClose}
            >
              <RiMenuUnfold2Fill size={24} />
            </Button>
          </Tooltip>

          <ToggleModeComponent />

          <Box borderTop={"solid 1px"} w={"95%"} mt={14} mx={"auto"}></Box>
          <DrawerBody>{/* Adicione o conteúdo do menu aqui */}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
