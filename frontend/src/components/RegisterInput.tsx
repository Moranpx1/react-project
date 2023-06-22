const RegisterInput = (props: any) => {

    const {label, onChange, id, errorMessage, ...inputProps} = props;

    return (
        <>
            <label>{label}</label>
            <input {...inputProps} onChange = {onChange}/>
            <span className = "errorText">{errorMessage}</span>
        </>
    )
}

export default RegisterInput;