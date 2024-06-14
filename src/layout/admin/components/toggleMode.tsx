import { useColorMode, Button, Tooltip, } from "@chakra-ui/react";
import { LuMoonStar } from "react-icons/lu";
import { MdSunny } from "react-icons/md";

export default function ToggleModeComponent() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip hasArrow label='Inverter modo de cores' placement="right" ml={-4}>
      <Button w={'min-content'} _hover={{ transform: 'translateX(-5px)' }} pos={"absolute"} right={-2} top={2} colorScheme="transparent" onClick={toggleColorMode}>
        {colorMode === 'light' ? <LuMoonStar color="black" size={24} /> : <MdSunny color="white" size={24} />}
      </Button>
    </Tooltip>
  )
}
