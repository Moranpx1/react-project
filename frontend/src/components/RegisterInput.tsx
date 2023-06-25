const RegisterInput = (props: any) => {

    const {label, onChange, id, errorMessage, ...inputProps} = props;

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input {...inputProps} id = {id} onChange = {onChange}/>
            <span className = "errorText">{errorMessage}</span>
        </>
    )
}

export default RegisterInput;