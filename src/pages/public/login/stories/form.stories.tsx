import { StoryFn, Meta } from "@storybook/react";
import FormComponent from "../components/form";
import { KeyProvider } from "../../../../context/auth/token-login/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

export default {
  title: "Example/FormComponent",
  component: FormComponent,
  decorators: [
    (Story: StoryFn) => (
      <KeyProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ChakraProvider>
              <Story />
            </ChakraProvider>
          </Router>
        </QueryClientProvider>
      </KeyProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <FormComponent />;

export const Default = Template.bind({});
Default.args = {};
