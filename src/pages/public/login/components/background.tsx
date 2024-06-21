import { Image } from "@chakra-ui/react";

export default function BackgroundComponent({ back }: any) {
  return (
    <Image h={"100vh"} w={"100%"} pos={"fixed"} top={0} left={0} src={back} />
  );
}
