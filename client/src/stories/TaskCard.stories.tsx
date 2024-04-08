import { Meta, StoryObj } from "@storybook/react";

import { TaskCard } from "../components/task/TaskCard";
import { Mockstore } from "./mocks/store";

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
  title: "Task card",
  tags: ["autodocs"],
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    task: {
      id: 1,
      name: "Task 1",
      description: "Task 1 description",
      dueDate: "2024-04-08T11:06:22.449Z",
      listId: 1,
      priority: 3,
    },
  },
};
