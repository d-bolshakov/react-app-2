import { Meta, StoryObj } from "@storybook/react";

import { Select } from "../components/ui/Select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Select",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: "Default select",
    options: [
      { value: 1, name: "Option 1" },
      { value: 2, name: "Option 2" },
      { value: 3, name: "Option 3" },
    ],
    containerClassName: "w-1/2",
  },
};
