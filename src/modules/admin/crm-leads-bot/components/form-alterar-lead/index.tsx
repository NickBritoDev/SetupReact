import { useState } from "react";
import {
  Text,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Input,
  Grid,
  Select,
} from "@chakra-ui/react";
import { usePutAlterarDadosCliente } from "../../hooks/usePutAlterarDadosCliente";
import { formatCPF, formatCurrency, formatDateInput, formatPhone } from "./helpers/helpers";
import { HiPencilSquare } from "react-icons/hi2";

export default function FormAlterarLeadComponent({ detalhesLeads }: any) {
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
  const { UseRequestAlterarDadosCliente } = usePutAlterarDadosCliente()
  const [formData, setFormData] = useState(detalhesLeads?.formulario);

  const handleInputChange = (index: any, event: any) => {
    const newFormData = [...formData];
    const { value, type } = event.target;

    if (type === 'text') {
      newFormData[index].value = value;
    } else {
      newFormData[index].value = value;
    }

    setFormData(newFormData);
  };

  const handleSave = () => {
    const textValues = [];
    const numberValues = [];
    const cpfValues = [];
    const dataValues = [];

    for (const data of formData) {
      if (data.mascara === "Sem Mascara") {
        textValues.push({ [data.campos]: data.value });
      } else if (data.mascara === 'dinheiro') {
        let dinheiroFormatado = data.value.replace("R$", "").replaceAll(/[a-zA-Z]/g, "").replaceAll(/\s/g, "").replaceAll(",", "").replaceAll(".", "");
        dinheiroFormatado = (parseFloat(dinheiroFormatado) / 100).toFixed(2);
        numberValues.push({ [data.campos]: Number(dinheiroFormatado) });
      } else if (data.mascara === 'cpf') {
        const cpfFormatado = data.value.replaceAll('-', '').replaceAll(".", "");
        cpfValues.push({ [data.campos]: Number(cpfFormatado) });
      } else if (data.mascara === 'data') {
        const [day, month, year] = data.value.split('/');
        const dataFormatada = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        dataValues.push({ [data.campos]: dataFormatada });
      }
    }

    const payload = {
      ...Object.assign({}, ...textValues),
      ...Object.assign({}, ...numberValues),
      ...Object.assign({}, ...cpfValues),
      ...Object.assign({}, ...dataValues)
    };

    UseRequestAlterarDadosCliente(payload);
    onCloseUpdate()
  };


  const applyMask = (value: any, mask: any) => {
    if (value === "" && mask === 'dinheiro') return 0
    switch (mask) {
      case 'cpf':
        return formatCPF(value);
      case 'celular':
        return formatPhone(value);
      case 'dinheiro':
        return formatCurrency(parseFloat(value.replace(/[^\d]/g, '')) / 100);
      case 'data':
        return formatDateInput(value);
      default:
        return value;
    }
  };
  return (
    <>
      <Button mt={-1} colorScheme='green' display={'flex'} alignItems={'center'} justifyContent={'space-between'} w={'100%'}
        onClick={() => {
          onOpenUpdate()
          setFormData(detalhesLeads?.formulario)
        }
        }>
        <Text>Alterar Informações</Text>
        <HiPencilSquare size={22} />
      </Button>

      <Modal size={'full'} isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar/Acrescentar Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={'column'} w={'100%'}>
              <Heading mb={4} fontWeight={'semibold'} size={'md'}><strong>Cliente:</strong> {detalhesLeads?.nome}</Heading>
              <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {formData?.map((items: any, index: number) => (
                  <Flex display={items.tipos === 'hidden' ? 'none' : 'flex'} flexDir={'column'} key={index}>
                    <Text fontWeight={'semibold'}>{items.label}</Text>
                    {items?.htmlElement === 'input' ? (
                      <Input
                        disabled={!items.edit}
                        type='text'
                        value={applyMask(items.value, items.mascara)}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    ) : items?.htmlElement === 'select' ? (
                      <Select
                        value={items.value}
                        onChange={(event) => handleInputChange(index, event)}
                      >
                        {items?.options?.map((opt: any, idx: number) => (
                          <option key={idx} value={opt.value}>{opt.label}</option>
                        ))}
                      </Select>
                    ) : null}
                  </Flex>
                ))}
              </Grid>

            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseUpdate}>
              Cancelar
            </Button>
            <Button colorScheme='green' onClick={handleSave}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
