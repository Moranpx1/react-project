import Rect, {useState} from 'react';

const Login = () => {
    return (
        <>
          <form>
            <label form = "user_name">User name</label>
            <input type = "text" placeholder="Enter user name" id = "user_name" name = "user_name"></input>
            <label form = "password">Password</label>
            <input type = "text" placeholder="Enter password" id = "password" name = "password"></input>
            <button>Log In</button>
          </form>
          <button>Don't have an account? Click to register</button>
        </>
      );
}

export default Login; 