const Validation = (values) => {
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /^.(8,)$/
    
    if(values.userName === ""){
        error.userName = "Input should not be empty"
    }

    if(!emailPattern.test(values.email)){
        error.email = "The email is not valid"
    }   

    if(!passwordPattern.test(values.password)){
        error.password = "Password must contain at least 8 characters"
    }

    if(values.confirmPassword !== values.password){
        error.passwordConfirm = "Password not matched"
    }
    
    return error;    
}

export default Validation;