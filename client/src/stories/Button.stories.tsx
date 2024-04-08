import { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonTypes } from "../components/ui/Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ButtonTypes,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: ButtonTypes.PRIMARY,
    children: "Primary button",
    onClick: () => null,
  },
};

export const Secondary: Story = {
  args: {
    type: ButtonTypes.SECONDARY,
    children: "Secondary button",
    onClick: () => null,
  },
};

export const Dashed: Story = {
  args: {
    type: ButtonTypes.DASHED,
    children: "Dashed button",
    onClick: () => null,
  },
};
