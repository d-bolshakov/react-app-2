import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { DatePicker } from "../components/ui/DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "Datepicker",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: "Default datepicker",
    value: Date.now(),
    containerClassName: "w-1/2",
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      args.onChange?.(e);

      setArgs({ value: new Date(e.target.value).toISOString() });
    };

    return <DatePicker {...args} onChange={onValueChange} />;
  },
};
