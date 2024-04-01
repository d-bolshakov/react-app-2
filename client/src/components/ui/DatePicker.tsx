type DatePickerProps = {
  id: string;
  title: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  containerClassName?: string;
};

export const DatePicker = ({
  title,
  id,
  value,
  required,
  containerClassName,
  onChange,
}: DatePickerProps) => {
  const formatDate = (isoDateStr: string) => isoDateStr.slice(0, 10);
  return (
    <div className={containerClassName}>
      {title && (
        <>
          <label htmlFor={id}>{title}</label>
          <br />
        </>
      )}
      <input
        className="w-full bg-gray-200 py-1 px-2 rounded-md outline-none mt-1"
        type="date"
        id={id}
        value={formatDate(new Date(value).toISOString())}
        onChange={onChange}
        required={required}
      />
      <br />
    </div>
  );
};
