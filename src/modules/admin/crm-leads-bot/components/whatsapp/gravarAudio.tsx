import React, { useState } from 'react';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { AiFillAudio } from 'react-icons/ai';
import { FaRegStopCircle } from 'react-icons/fa';
import { usePostMensagensWhatsApp } from '../../hooks/whatsapp/usePostMensagensWhatsApp';
import { useGetInstanciasWhatsApp } from '../../hooks/whatsapp/useGetInstanciasWhatsApp';
import { useGetMinhaConta } from '../../../../../hooks/useGetMinhaConta';
import { usePostUploadFile } from '../../hooks/whatsapp/usePostUploadFile';
import RecordRTC from 'recordrtc';
import { saveAs } from 'file-saver';

const GravarAudioComponent: React.FC<{ telefone: string; idLead: string }> = ({ telefone, idLead }) => {
  const { data: minhaConta } = useGetMinhaConta();
  const { data: instancias } = useGetInstanciasWhatsApp();
  const minhaInstancia = instancias && instancias[0] ? instancias[0].instance : null;
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { UseRequestPostMensagensWhatsApp } = usePostMensagensWhatsApp();
  const { UseRequestPostUploadFile } = usePostUploadFile();
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const toast = useToast();

  const enviarArquivo = async (audioBlob: Blob): Promise<void> => {
    const audioFile = new File([audioBlob], 'audio.oga', { type: 'audio/ogg' });
    try {
      const locationAws = await UseRequestPostUploadFile({ file: audioFile });
      console.log(locationAws, 'location retorno');
      enviarAudio(locationAws);
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload audio file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const enviarAudio = (audioUrl: string) => {
    const payload = {
      id_acesso: minhaConta?.idAcesso,
      idLead: idLead,
      instance: minhaInstancia,
      body: audioUrl,
      chatId: telefone,
      type: "ptt",
    };
    UseRequestPostMensagensWhatsApp(payload);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new RecordRTC(stream, { type: 'audio' });
      newRecorder.startRecording();
      setIsRecording(true);
      setRecorder(newRecorder);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start recording.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        URL.createObjectURL(audioBlob);
        setIsRecording(false);
        saveAs(audioBlob, 'audio.oga');
        enviarArquivo(audioBlob);
      });
    }
  };

  return (
    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
      <Button
        display={"none"}
        colorScheme="none"
        _hover={{ bg: "gray.300" }}
        borderRadius={"50%"}
        w={"50px"}
        h={"50px"}
        bg={"gray.200"}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <FaRegStopCircle color="red" size={32} />
        ) : (
          <AiFillAudio color="gray" size={32} />
        )}
      </Button>
    </Flex>
  );
};

export default GravarAudioComponent;