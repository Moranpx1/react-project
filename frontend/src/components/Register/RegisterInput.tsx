const RegisterInput = (props: any) => {
  const { errorCSS, label, onChange, id, errorMessage, ...inputProps } = props;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} id={id} onChange={onChange} />
      <span className={errorCSS}>{errorMessage}</span>
    </>
  );
};

export default RegisterInput;
