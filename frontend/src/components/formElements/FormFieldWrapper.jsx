const FormFieldWrapper = ({ label, id, children, hidden }) => {
  const hiddenEl = hidden ? "hidden" : ""
  return (
    <div className={`grid grid-cols-[100px_1fr] items-center mb-4 text-[.9rem] ${hiddenEl}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};

export default FormFieldWrapper;
