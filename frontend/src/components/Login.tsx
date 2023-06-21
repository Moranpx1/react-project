import React, {useState} from 'react';
import axios from 'axios';

const Login = (props: any) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //API related
    axios.post('http://localhost:3000/api/login', {
      username: userName,
      password: password
    })
      .then(response => {
        // Handle successful login response
        console.log(response.data); // Log the response data or perform any necessary actions

        // Reset the form
        setUserName('');
        setPassword('');
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }

    return (
        <div className = "auth-form-container">
          <form className = "form" autoComplete = "off" onSubmit={handleSubmit}>
            <div className = "heading">Login</div>
            <label htmlFor = "userName">User name</label>
            <input type = "text" value = {userName} onChange = {(e) => setUserName(e.target.value)} placeholder="Enter user name" id = "userName" name = "userName"></input>
            <label htmlFor = "password">Password</label>
            <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="Enter password" id = "password" name = "password"></input>
            <button className = "bigButton" type = "submit">Login</button>
            <button className = "periButton" onClick={() => props.onFormSwitch("register")}>Don't have an account? Sign Up here</button>
          </form>
        </div>
      );
}

export default Login; 