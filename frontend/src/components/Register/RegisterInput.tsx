const RegisterInput = (props: any) => {
  const { errorCSS, label, onChange, errorMessage, ...inputProps } = props;

  return (
    <>
      <label>{label}</label>
      <input required {...inputProps} onChange={onChange} />
      <span className={errorCSS}>{errorMessage}</span>
    </>
  );
};

export default RegisterInput;
