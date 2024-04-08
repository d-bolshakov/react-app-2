import { Select } from "../components/ui/Select";
import { render } from "@testing-library/react";

describe(Select, () => {
  it("select should render", () => {
    const value = 1;
    const onChange = () => null;
    const id = "test-select";
    const label = "test-select";
    const options = [
      { value: 1, name: "Option 1" },
      { value: 2, name: "Option 2" },
    ];
    const { getByRole } = render(
      <Select
        options={options}
        id={id}
        value={value}
        onChange={onChange}
        title={label}
      />
    );
    const renderedSelect = getByRole("combobox");
    expect(renderedSelect).toBeDefined();
  });
  it("select should have a label", () => {
    const value = 1;
    const onChange = () => null;
    const id = "test-select";
    const label = "test-select";
    const options = [
      { value: 1, name: "Option 1" },
      { value: 2, name: "Option 2" },
    ];
    const { getByLabelText } = render(
      <Select
        options={options}
        id={id}
        value={value}
        onChange={onChange}
        title={label}
      />
    );
    const renderedSelect = getByLabelText(label);
    expect(renderedSelect).toBeDefined();
  });
  it("select should have right number of provided options", () => {
    const value = 1;
    const onChange = () => null;
    const id = "test-select";
    const options = [
      { value: 1, name: "Option 1" },
      { value: 2, name: "Option 2" },
    ];
    const { getByRole } = render(
      <Select options={options} id={id} value={value} onChange={onChange} />
    );
    const optionsCount = getByRole("combobox").childElementCount;
    expect(optionsCount).toEqual(options.length);
  });
});
