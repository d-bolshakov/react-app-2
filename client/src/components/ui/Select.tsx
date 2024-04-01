import { ReactNode } from "react";

type Props = {
  id: string;
  title?: string;
  options?: { value: string | number; name: string }[];
  value: string | number;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children?: ReactNode;
  containerClassName?: string;
};

export const Select = ({
  id,
  title,
  options,
  value,
  required,
  onChange,
  children,
  containerClassName,
}: Props) => {
  return (
    <div className={containerClassName}>
      {title && (
        <>
          <label htmlFor={id}>{title}</label>
          <br />
        </>
      )}
      <select
        className="w-full bg-gray-200 py-1 px-2 rounded-md outline-none mt-1"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options &&
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          ))}
        {children}
      </select>
      <br />
    </div>
  );
};
