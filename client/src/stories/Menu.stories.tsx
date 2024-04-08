import { Meta, StoryObj } from "@storybook/react";

import { Menu } from "../components/ui/Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
  subcomponents: { Item: Menu.Item },
  title: "Menu",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: (
      <>
        <Menu.Item onClick={() => null} selected={true}>
          Menu Item 1
        </Menu.Item>
        <Menu.Item onClick={() => null}>Menu Item 2</Menu.Item>
        <Menu.Item onClick={() => null}>Menu Item 3</Menu.Item>
      </>
    ),
  },
};

export const OneItem: Story = {
  render: (args) => (
    <Menu {...args}>
      <Menu.Item onClick={() => null}>Menu item</Menu.Item>
    </Menu>
  ),
};
