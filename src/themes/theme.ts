import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      invert_color_subtitle: (props: { colorMode: string; }) => (props.colorMode === 'dark' ? 'gray' : 'black'),
      invert_color_title: (props: { colorMode: string; }) => (props.colorMode === 'dark' ? 'white' : 'black'),
      invert_colors: (props: { colorMode: string; }) => (props.colorMode === 'dark' ? 'white' : 'black'),
    },
  },
});

export default theme;
