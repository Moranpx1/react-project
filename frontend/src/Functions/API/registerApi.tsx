import React from "react";
import axios from "axios";

const registerApi = (userName: string, password: string) => {
  return axios.post("http://localhost:3000/api/register", {
    username: userName,
    password: password,
  });
};

export default registerApi;
