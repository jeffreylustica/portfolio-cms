const FormFieldWrapper = ({ label, id, children }) => {
  return (
    <div className="grid grid-cols-[100px_1fr] items-center mb-4 text-[.9rem]">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};

export default FormFieldWrapper;
