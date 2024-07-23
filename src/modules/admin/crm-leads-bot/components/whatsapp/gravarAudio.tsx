import React, { useState, useRef } from 'react';
import { Button, Alert, AlertIcon, Flex } from '@chakra-ui/react';
import { AiFillAudio } from 'react-icons/ai';
import { FaRegStopCircle } from 'react-icons/fa';
import { usePostMensagensWhatsApp } from '../../hooks/whatsapp/usePostMensagensWhatsApp';
import { useGetInstanciasWhatsApp } from '../../hooks/whatsapp/useGetInstanciasWhatsApp';
import { useGetMinhaConta } from '../../../../../hooks/useGetMinhaConta';
import { usePostUploadFile } from '../../hooks/whatsapp/usePostUploadFile';

const GravarAudioComponent: React.FC<{ telefone: string; idLead: string }> = ({ telefone, idLead }) => {
  const { data: minhaConta } = useGetMinhaConta();
  const { data: instancias } = useGetInstanciasWhatsApp();
  const minhaInstancia = instancias && instancias[0] ? instancias[0].instance : null;
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { UseRequestPostMensagensWhatsApp } = usePostMensagensWhatsApp();
  const { UseRequestPostUploadFile } = usePostUploadFile();

  const enviarArquivo = async (audioBlob: Blob): Promise<void> => {
    const audioFile = new File([audioBlob], 'audio.mp3', { type: 'audio/mp3' });
    try {
      const locationAws = await UseRequestPostUploadFile({ file: audioFile });
      console.log(locationAws, 'location retorno');
      enviarAudio(locationAws);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
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
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices are not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunks.current = [];
        await enviarArquivo(audioBlob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
    } catch (error) {
      console.error('Error accessing audio media:', error);
      setError('Erro ao acessar o microfone. Verifique suas permissões e conectividade do dispositivo.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Button
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
