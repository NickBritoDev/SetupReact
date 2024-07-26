import { IGruposAcesso } from '../../types/types'
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react"

type Props = IGruposAcesso;

export default function CardComponent({ nome }: Props) {
  return (
  <AccordionItem boxShadow="md">
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
            {nome}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
      <Divider />
      <Button colorScheme='green'>Editar</Button>
      <Button colorScheme='red'>Excluir</Button>
    </AccordionPanel>
  </AccordionItem>
  
  )
}