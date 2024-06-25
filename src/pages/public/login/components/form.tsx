import {
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import logo from "../images/logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { validationSchema } from "../schema/login";
import { useEffect, useState } from "react";
import { usePostLogin } from "../hooks/usePostLogin";
import { useNavigate } from "react-router-dom";

export default function FormComponent() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { UseRequestLogin, isLoading, isSuccess } = usePostLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Bem Vindo(a)",
        description: "Você acessou um serviço Mais Valor",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      navigate("/admin/home");
    }
  }, [isSuccess]);

  return (
    <Flex
      pos={"relative"}
      pb={8}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      rounded={"2xl"}
      zIndex={9999}
      bg={"white"}
      border={"solid 1px gray"}
      w={"450px"}
    >
      <Image
        borderRadius={"50%"}
        boxShadow={"2xl"}
        top={-4}
        right={0}
        pos={"absolute"}
        w={"200px"}
        h={"200px"}
        src={logo}
        alt="logo eagles software house"
      />

      <Formik
        initialValues={{ usuario: "", senha: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          UseRequestLogin(values);
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form style={{ width: "80%" }}>
            <Heading mt={14} w={"100%"} textAlign={"left"} mb={14}>
              Login
            </Heading>
            <Field name="usuario">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.usuario && form.touched.usuario}
                  mb={4}
                >
                  <Input
                    mt={10}
                    variant={"flushed"}
                    {...field}
                    id="usuario"
                    placeholder="Usuário"
                  />
                  <FormErrorMessage fontWeight={"bold"}>
                    * {form.errors.usuario}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="senha">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.senha && form.touched.senha}
                  mb={4}
                >
                  <InputGroup>
                    <Input
                      variant={"flushed"}
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="senha"
                      placeholder="Senha"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        colorScheme="transparent"
                        color={"black"}
                        mr={-6}
                        h="1.75rem"
                        size="sm"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FaRegEyeSlash size={22} />
                        ) : (
                          <FaRegEye size={22} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontWeight={"bold"}>
                    * {form.errors.senha}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              gap={4}
              mx={"auto"}
              alignItems={"center"}
              justifyContent={"space-between"}
              display={"flex"}
              mt={10}
              w={"100%"}
              colorScheme="green"
              isLoading={isLoading}
              type="submit"
            >
              <Text>ACESSAR</Text>
              <MdDoubleArrow size={22} />
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
