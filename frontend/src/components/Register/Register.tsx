import React, { useState } from "react";
import RegisterInput from "./RegisterInput";
import { Navigate, useNavigate } from "react-router-dom";
import registerApi from "../../Functions/API/registerApi";

const Register = (props: any) => {
  //Routing
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //User name errors
  const [userNameError, setUserNameError] = useState(
    "Must include at least 3 characters"
  );

  const [userNameErrorClass, setUserNameErrorClass] = useState("errorText");

  //OnChange of input fields
  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });

    if (e.target.name === "userName") {
      setUserNameError("Must include at least 3 characters");
      setUserNameErrorClass("errorText");
    }
  };

  //Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");

    //Setting values
    const userName = values.userName;
    const password = values.password;

    //API related
    registerApi(userName, password)
      .then((response) => {
        console.log("success");
        //Route
        navigate("/registered");
      })
      .catch((error) => {
        console.log("failed to register user");

        //Displaying error below user name
        setUserNameErrorClass("visibleErrorText");
        setUserNameError("User Name Already Taken");

      });
  };

  return (
    <div className="App">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="heading">Create your account</div>

        <div className="register-form-container">
          <div className="register-form-columns">
            <RegisterInput
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              label="First Name"
              errorMessage="Can not include special chars and numbers"
              errorCSS="errorText"
              pattern="^(?!.*  )(?!^ $)[A-Za-z ]+$"
              onChange={onChange}
            />
            <RegisterInput
              name="userName"
              type="text"
              placeholder="Enter User Name"
              label="User Name"
              errorMessage = {userNameError}
              errorCSS= {userNameErrorClass}
              pattern="^(?!\\s*$).{3,}$"
              onChange={onChange}
            />
            <RegisterInput
              name="password"
              type="password"
              placeholder="Enter Password"
              label="Password"
              errorMessage = "Must include at least 8 characters"
              errorCSS="errorText"
              pattern="^(?!\\s*$).{8,}$"
              onChange={onChange}
            />
          </div>

          <div className="register-form-columns">
          <RegisterInput
              name="lastname"
              type="text"
              placeholder="Enter Last Name"
              label="Last Name"
              errorMessage = "Can not include special chars and numbers"
              errorCSS="errorText"
              pattern="^(?!.*  )(?!^ $)[A-Za-z ]+$"
              onChange={onChange}
            />
            <RegisterInput
              name="email"
              type="email"
              placeholder="Enter Email"
              label="Email"
              errorMessage = "Must be valid address"
              errorCSS="errorText"
              onChange={onChange}
            />
            <RegisterInput
              name="confirmPassword"
              type="password"
              placeholder="Repeat Password"
              label="Confirm Password"
              errorMessage = "Passwords must match"
              errorCSS="errorText"
              pattern={values.password}
              onChange={onChange}
            />
          </div>
        </div>

        <button className="bigButton" type="submit">
          Sign Up
        </button>
        <button className="periButton" onClick={() => navigate("/login")}>
          Already have an account? Click here to log in
        </button>
      </form>
    </div>
  );
};

export default Register;
