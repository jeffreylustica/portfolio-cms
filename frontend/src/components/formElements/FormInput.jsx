import FormFieldWrapper from "./FormFieldWrapper";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  id,
  inputRef,
  accept, // for file input
  hidden,
  ...rest
}) => {
  const inputId = id || name;

  return (
    <FormFieldWrapper label={label} id={inputId} hidden={hidden}>
      <input
        className="max-w-sm w-full border border-neutral-200 rounded-sm p-2 py-3 focus:shadow-lg focus:shadow-blue focus:outline-1 focus:outline-blue-300"
        type={type}
        name={name}
        id={inputId}
        value={type === "file" ? undefined : value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        ref={inputRef}
        accept={accept}
        {...rest}
      />
    </FormFieldWrapper>
  );
};

export default FormInput;
