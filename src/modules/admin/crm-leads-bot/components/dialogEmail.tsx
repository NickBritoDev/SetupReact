import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tooltip,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { TfiEmail } from "react-icons/tfi";
import emailjs from "emailjs-com";

export default function DialogEmailComponent({ email, produto }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const produtoEmail = `Nós vimos seu interesse em obter ${produto}`;

  const sendEmail = () => {
    const templateParams = {
      to_email: email,
      reply_to: email,
      nome: "Grupo Mais Valor",
      vendedor: "Nicolas Brito da Cruz",
      mensagem: `Você já conhece o Bolsa Família, o programa que transforma vidas e promove a inclusão social? Com ele, milhares de famílias brasileiras têm a oportunidade de sair da linha da pobreza e conquistar uma vida mais digna. Mas você sabia que pode se beneficiar ainda mais com este programa?

Apresentamos a Bolsa Família Plus, um serviço exclusivo que maximiza os benefícios do Bolsa Família para que você possa ir além. Com a Bolsa Família Plus, você terá acesso a:

1. Consultoria Financeira Personalizada: Especialistas em finanças vão ajudar você a planejar e usar seus recursos de forma eficiente, garantindo que o dinheiro renda mais no seu dia a dia.

2. Capacitação Profissional: Cursos gratuitos e de qualidade para aumentar suas chances no mercado de trabalho, seja com emprego formal ou com empreendedorismo.

3. Apoio Educacional: Aulas de reforço e preparação para exames, garantindo que seus filhos tenham um futuro brilhante e cheio de oportunidades.

4. Saúde e Bem-estar: Acesso a programas de saúde, nutricionistas e atividades físicas, para que toda a família esteja sempre saudável e feliz.

5. Inclusão Digital: Aulas de informática e acesso à internet, permitindo que você e sua família estejam sempre conectados e informados sobre novas oportunidades.

Não perca essa chance de transformar sua vida e a de sua família! Inscreva-se agora na Bolsa Família Plus e dê o primeiro passo rumo a um futuro melhor.

Para mais informações e inscrições, visite nosso site ou entre em contato pelo telefone [seu telefone] ou WhatsApp [seu WhatsApp]. Estamos prontos para ajudar você a conquistar seus sonhos!

Bolsa Família Plus - Transformando Vidas, Realizando Sonhos.`,
      produto: produtoEmail,
    };

    emailjs
      .send(
        "service_qvs5okp",
        "template_9ry0nge",
        templateParams,
        "t8jQQY6EUCqOFe2Nr",
      )
      .then(
        (response) => {
          console.log(
            "Email enviado com sucesso!",
            response.status,
            response.text,
          );
        },
        (err) => {
          console.error("Falha ao enviar o email:", err);
        },
      );
  };

  return (
    <>
      <Tooltip hasArrow placement="top" label="Enviar email">
        <Button
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          onClick={onOpen}
        >
          <Text>Email</Text>
          <TfiEmail size={22} />
        </Button>
      </Tooltip>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Enviar Email
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja enviar um email para {email}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  sendEmail();
                  onClose();
                }}
                ml={3}
              >
                Enviar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
