'use client'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { Key, useEffect, useRef, useState } from 'react'
import { FaBrain } from 'react-icons/fa'
import LoadingOraculoComponent from './loading'

export default function OraculoComponent({ detalhesLeads }: any) {
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
      }, 1500);
    }
  }, [isOpen])

  return (
    <>
      <Button colorScheme='orange' w={'100%'} display={detalhesLeads?.propriedades === null ? 'none' : 'flex'} alignItems={'center'} justifyContent={'space-between'} gap={2} ref={btnRef} onClick={onOpen}>
        <Text>Mais Valor Genius</Text>
        <FaBrain size={32} />
      </Button>
      <Drawer
        size={'lg'}
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader display={loading ? 'none' : ''}>
            <Heading size={'lg'}>Consulta Mais Valor Genius</Heading>
            <Text fontSize={16}>O Mais Valor Genius faz a consulta do cliente em algumas fontes para você!</Text>
          </DrawerHeader>

          <DrawerBody>
            <LoadingOraculoComponent loading={loading} />
            {detalhesLeads?.propriedades?.map((props: any, index: Key | null | undefined) => (
              <Flex
                display={loading ? 'none' : 'flex'}
                cursor={'not-allowed'}
                _hover={{ bg: '#229544', color: 'white' }}
                p={2}
                rounded={'2xl'}
                boxShadow={'lg'}
                flexDir={'column'}
                alignItems={'flex-start'}
                justifyContent={'flex-start'}
                mt={2} key={index}>
                <Text mb={2} textTransform={'uppercase'} fontSize={18} fontWeight={'bold'}>{props.label}</Text>
                <Text fontWeight={'semibold'} >
                  {props.value.split('\n').map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </Text>
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
