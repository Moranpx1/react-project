const LoginInput = (props: any) => {

    const {...inputProps} = props;

    return (
        <>
            <label>{props.label}</label>
            <input {...inputProps} onChange = {props.onChange}></input>
        </>
    )
}
export default LoginInput