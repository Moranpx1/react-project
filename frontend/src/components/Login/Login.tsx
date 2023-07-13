import React, { useState } from "react";
import axios from "axios";
import LoginInput from "./LoginInputs";
import "../css/App.css";

const Login = (props: any) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  //Define attributes of inputs
  const inputs = [
    {
      id: "1",
      name: "userName",
      type: "text",
      label: "User Name",
      placeholder: "Enter User Name",
      required: true,
    },
    {
      id: "2",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
      required: true,
    },
  ];

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

    //API related
    axios
      .post("http://localhost:3000/api/login", {
        username: userName,
        password: password,
      })
      .then((response) => {
        console.log("Success");
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
          <div className="heading text-info">Login</div>

          {inputs.map((input) => (
            <LoginInput key={input.id} {...input} onChange={onChange} />
          ))}
          <span className="visibleErrorText">{errorMessage}</span>

          <button className="bigButton bg-info" type="submit">
            Login
          </button>
          <button
            className="periButton"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account? Sign Up here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
