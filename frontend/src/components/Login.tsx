import Rect, {useState} from 'react';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  //Censor password
  const censoredPassword = '*'.repeat(password.length);

  const handleSubmit = (e) => {
    e.preventDafault();
  }

    return (
        <>
          <form>
            <label form = "user_name">User name</label>
            <input type = "text" value = {userName} placeholder="Enter user name" id = "userName" name = "userName" onChange = {handleUserNameChange}></input>
            <label form = "password">Password</label>
            <input type = "text" value = {censoredPassword} placeholder="Enter password" id = "password" name = "password" onChange = {handlePasswordChange}></input>
            <button type = "submit">Log In</button>
          </form>
          <button>Don't have an account? Click to register</button>
        </>
      );
}

export default Login; 