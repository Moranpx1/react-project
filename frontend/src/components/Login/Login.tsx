import React, { useContext, useState } from "react";
import axios from "axios";
import LoginInput from "./LoginInputs";
import { useNavigate } from "react-router-dom";
import { UserNameContext } from "../../contexts/userName";
import loginApi from "../../Functions/API/loginApi";

const Login = (props: any) => {
  //Context
  const { setUserName } = useContext(UserNameContext);

  //Routing
  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  //OnChange of input fields
  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  //Auth error
  const [errorMessage, setErrorMessage] = useState("");

  //Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Setting values
    const userName = values.userName;
    const password = values.password;

    //API
    loginApi(userName, password)
      .then((response) => {
        console.log("Success");
        // Context
        setUserName(response.data.username);
        // Route to tasks page
        navigate("/tasks");
      })
      .catch((error) => {
        console.log("Fail");
        setErrorMessage("Wrong user name or password");
      });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="heading">Login</div>
          <LoginInput
            name="userName"
            type="text"
            label="User Name"
            placeholder="Enter User Name"
            required:true
            onChange={onChange}
          />
          <LoginInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter Password"
            required:true
            onChange={onChange}
          />
          <span className="visibleErrorText">{errorMessage}</span>
          <button className="bigButton" type="submit">
            Login
          </button>
          <button className="periButton" onClick={() => navigate("/register")}>
            Don't have an account? Sign Up here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
