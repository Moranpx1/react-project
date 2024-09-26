import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserNameContext } from "../../contexts/userName";

const loginApi = (userName: string, password: string) => {
    return(
    axios.post(
    "http://localhost:3000/api/login",
    {
      username: userName,
      password: password,
    },
    {
      withCredentials: true,
    }
  ));
};

export default loginApi;
