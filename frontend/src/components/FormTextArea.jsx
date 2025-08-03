import FormFieldWrapper from "./FormFieldWrapper";

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  id,
  rows = 4,
  inputRef,
  ...rest
}) => {
  const textareaId = id || name;

  return (
    <FormFieldWrapper label={label} id={textareaId}>
      <textarea
        className="max-w-sm border border-neutral-200 rounded-sm p-2 py-3 focus:shadow-lg focus:shadow-blue focus:outline-1 focus:outline-blue-300"
        name={name}
        id={textareaId}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        ref={inputRef}
        {...rest}
      />
    </FormFieldWrapper>
  );
};

export default FormTextarea;
