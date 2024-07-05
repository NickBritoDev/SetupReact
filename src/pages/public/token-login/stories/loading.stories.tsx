import { ChakraProvider } from "@chakra-ui/react";
import LoadingComponent from "../components/loading";
import type { Meta, StoryFn } from "@storybook/react";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Example/LoadingComponent",
  component: LoadingComponent,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: JSX.IntrinsicAttributes) => (
  <LoadingComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {};
