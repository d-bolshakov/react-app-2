import { Meta, StoryObj } from "@storybook/react";

import { Input } from "../components/ui/Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { title: "Default input", type: "text", containerClassName: "w-1/2" },
};
