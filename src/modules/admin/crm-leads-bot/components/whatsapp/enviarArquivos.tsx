import React, { useRef } from 'react';
import { useGetMinhaConta } from "../../../../../hooks/useGetMinhaConta";
import { useGetInstanciasWhatsApp } from "../../hooks/whatsapp/useGetInstanciasWhatsApp";
import { usePostMensagensWhatsApp } from "../../hooks/whatsapp/usePostMensagensWhatsApp";
import { Divider, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { FcAddImage, FcFile, FcSpeaker, FcVideoCall } from "react-icons/fc";
import { usePostUploadFile } from '../../hooks/whatsapp/usePostUploadFile';

export default function EnviarArquivosComponents({ idLead, telefone }: any) {
  const { data: minhaConta } = useGetMinhaConta();
  const { data: instancias } = useGetInstanciasWhatsApp();
  const { UseRequestPostMensagensWhatsApp } = usePostMensagensWhatsApp();
  const minhaInstancia = instancias && instancias[0] ? instancias[0].instance : null;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { UseRequestPostUploadFile } = usePostUploadFile();

  const uploadArquvioAws = async (document: File): Promise<void> => {
    try {
      const locationAws = await UseRequestPostUploadFile({ file: document });
      console.log(locationAws, 'location retorno');
      enviarArquivo(locationAws, document.type);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadArquvioAws(file);
    }
  };

  const enviarArquivo = (fileUrl: string, fileType: string) => {
    const payload = {
      id_acesso: minhaConta?.idAcesso,
      idLead: idLead,
      instance: minhaInstancia,
      body: fileUrl,
      chatId: telefone,
      type: getType(fileType),
    };
    UseRequestPostMensagensWhatsApp(payload);
  };

  const getType = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'document';
    if (fileType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  return (
    <Menu>
      <MenuButton
        _hover={{ bg: "gray.300" }}
        borderRadius={"50%"}
        w={"45px"}
        h={"40px"}
        bg={"gray.200"}
        as={IconButton}
        icon={<FaPlus color="gray" />}
      >
      </MenuButton>
      <MenuList>
        <MenuItem
          _hover={{ bg: 'rgba(0,0,0,0.1)', fontWeight: 'semibold' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
            <FcAddImage size={24} />
            <Text>IMAGEM</Text>
          </Flex>
        </MenuItem>
        <Divider />
        <MenuItem
          _hover={{ bg: 'rgba(0,0,0,0.1)', fontWeight: 'semibold' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
            <FcVideoCall size={24} />
            <Text>VIDEO</Text>
          </Flex>
        </MenuItem>
        <Divider />
        <MenuItem
          _hover={{ bg: 'rgba(0,0,0,0.1)', fontWeight: 'semibold' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
            <FcFile size={24} />
            <Text>DOCUMENTOS</Text>
          </Flex>
        </MenuItem>
        <Divider display={'none'} />
        <MenuItem display={'none'}
          _hover={{ bg: 'rgba(0,0,0,0.1)', fontWeight: 'semibold' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
            <FcSpeaker size={24} />
            <Text>AUDIO</Text>
          </Flex>
        </MenuItem>
      </MenuList>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Menu>
  );
}
