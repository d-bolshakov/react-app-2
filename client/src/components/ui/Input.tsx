type Props = {
  id: string;
  title?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputElement["type"];
  required?: boolean;
  placeholder?: string;
  containerClassName?: string;
};

export const Input = ({
  id,
  title,
  value,
  onChange,
  type,
  required,
  placeholder,
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
      <input
        className="w-full bg-gray-300 py-1 px-2 rounded-md outline-none mt-1"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};
