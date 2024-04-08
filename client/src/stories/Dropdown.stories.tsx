import { Meta, StoryObj } from "@storybook/react";

import { Dropdown } from "../components/ui/Dropdown";
import { Menu } from "../components/ui/Menu";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Dropdown",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: "Dropdown content",
  },
};

export const DropdownWithMenu: Story = {
  args: {
    children: (
      <Menu>
        <Menu.Item onClick={() => null}>Menu item 1</Menu.Item>
        <Menu.Item onClick={() => null}>Menu item 2</Menu.Item>
      </Menu>
    ),
  },
};
