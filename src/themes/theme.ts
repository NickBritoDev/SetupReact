import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        overflow: "hidden",
      },
      "html, body, #__next": {
        height: "100%",
      },
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        background: "green",
        borderRadius: "10px",
        border: "2px solid transparent",
      },
    },
  },
  colors: {
    brand: {
      invert_color_subtitle: (props: { colorMode: string }) =>
        props.colorMode === "dark" ? "gray" : "black",
      invert_color_title: (props: { colorMode: string }) =>
        props.colorMode === "dark" ? "white" : "black",
      invert_colors: (props: { colorMode: string }) =>
        props.colorMode === "dark" ? "white" : "black",
    },
  },
});

export default theme;
