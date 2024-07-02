import { StoryFn, Meta } from "@storybook/react";
import BackgroundComponent from "../components/background";
const back =
  "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default {
  title: "Example/BackgroundComponent",
  component: BackgroundComponent,
} as Meta;

const Template: StoryFn = (args) => <BackgroundComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  back: back,
};
