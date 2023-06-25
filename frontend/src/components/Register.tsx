import React, {useState} from 'react';
import axios from 'axios';
import RegisterInput from './RegisterInput'
import "../css/App.css";

const Register = (props: any) => {
    
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const inputsColumn1 = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Enter First Name",
      label: "First Name",
      errorMessage: "Can not include numbers",
      pattern: "^[^0-9]+$",
      required: true
    },
    {
      id: 2,
      name: "userName",
      type: "text",
      placeholder: "Enter User Name",
      label: "User Name",
      errorMessage: "Must include at least 3 characters",
      pattern: "^(?!\\s*$).{3,}$",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      label: "Password",
      errorMessage: "Must include at least 8 characters",
      pattern: "^(?!\\s*$).{8,}$",
      required: true ,
    }
  ];
  
  
  const inputsColumn2 = [
    {
      id: 4,
      name: "lastName",
      type: "text",
      placeholder: "Enter Last Name",
      label: "Last Name",
      errorMessage: "Can not include numbers",
      pattern: "^[^0-9]+$",
      required: true
    },
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      label: "Email",
      errorMessage: "Must be a valid address",
      required: true
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Repeat Password",
      label: "Confirm Password",
      errorMessage: "Passwords must match",
      pattern: values.password,
      required: true
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const user = {...values};
    e.preventDefault();
    console.log("form submitted")
    console.log(user)
  }

  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value)
    setValues({...values, [e.target.name]: e.target.value})
  }
  
  return (
    <div>
      <form className = "form" autoComplete = "off" onSubmit={handleSubmit}>
        <div className = "heading">Create your account</div>
            
        <div className = "register-form-container">
          <div className = "register-form-columns">

            {inputsColumn1.map((input) => (
              <RegisterInput key = {input.id} {...input} onChange = {onChange}/>  
            ))}
          
          </div>
            
          <div className = "register-form-columns">
            
            {inputsColumn2.map((input) => (
                <RegisterInput key = {input.id} {...input} onChange = {onChange}/>  
            ))}
          
          </div>
        </div>

          <button className = "bigButton" type = "submit">Sign Up</button>
          <button className = "periButton" onClick={() => props.onFormSwitch("login")}>Already have an account? Click here to log in</button>
          
      </form>
    </div>
      );
}


export default Register;