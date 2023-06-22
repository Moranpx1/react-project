import React, {useState} from 'react';
import axios from 'axios';
import LoginInput from './LoginInputs';

const Login = (props: any) => {

  const[values, setValues] = useState({
    userName: "",
    password: ""
    }
  );

  const inputs = [
    {
      id: "1",
      name: "userName",
      type: "text",
      label: "User Name",
      placeholder: "Enter User Name"
    },
    {
      id: "2",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password"
    },
  ]

  
  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value)
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
   
  return (
        <div className = "auth-form-container">
          <form className = "form" autoComplete = "off" onSubmit={handleSubmit}>
            <div className = "heading">Login</div>
            
            {inputs.map((input) => (
              <LoginInput key = {input.id} {...input} onChange = {onChange}/>  
            ))}
            
            <button className = "bigButton" type = "submit">Login</button>
            <button className = "periButton" onClick={() => props.onFormSwitch("register")}>Don't have an account? Sign Up here</button>
          </form>
        </div>
      );
}


export default Login;  