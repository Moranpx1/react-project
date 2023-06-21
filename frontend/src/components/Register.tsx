import React, {useState} from 'react';
import axios from 'axios';
import validaion from './Validation';

const Register = (props: any) => {
    
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    
  }

    //API related
    axios.post('/api/register', {
      username: values.userName,
      password: values.password
    })
      .then(response => {
        // Handle successful login response
        console.log(response.data); // Log the response data or perform any necessary actions
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }
  
  return (
    <div>
          <form  className = "form" autoComplete = "off" onSubmit={handleSubmit}>
          <div className = "heading">Create your account</div>
            
            <div className = "register-form-container">
            <div className = "register-form-columns">

        <label htmlFor = "firstName">First name</label>
        <input type = "text" value = {values.firstName} onChange = {handleInput} placeholder="Your first name" id = "firstName" name = "firstName"></input>
        
            <label htmlFor = "userName">User name</label>
            <input type = "text" value = {values.userName} onChange = {handleInput} placeholder="Choose a user name" id = "userName" name = "userName"></input>
            
            <label htmlFor = "password">Password</label>
            <input type = "password" value = {values.password} onChange = {handleInput} placeholder="Create a password" id = "password" name = "password"></input>


            </div>
            
            <div className = "register-form-columns">

            <label htmlFor = "lastName">Last name</label>
            <input type = "text" value = {values.lastName} onChange = {handleInput} placeholder="Your last name" id = "lastName" name = "lastName"></input>
  
            <label htmlFor = "email">Email</label>
            <input type = "email" value = {values.email} onChange = {handleInput} placeholder="Enter your email" id = "email" name = "email"></input>
            
            <label htmlFor = "confirmPassword">Confirm password</label>
            <input type = "password" value = {values.confirmPassword} onChange = {handleInput} placeholder="Reapeat your password" id = "ConfirmPassword" name = "ConfirmPassword"></input>

            </div>
            </div>

            <button className = "bigButton" type = "submit">Sign Up</button>
            <button className = "periButton" onClick={() => props.onFormSwitch("login")}>Already have an account? Click here to log in</button>
          
          </form>
        </div>
      );
}

export default Register;