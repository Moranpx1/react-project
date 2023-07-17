import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Registered = () => {
    //Route
    const navigate = useNavigate();

    return (
        <div className="App">
        <div className="auth-form-container">
          <div className="form">
            <div className="headingSuccess heading">You have successfully registered</div> 
            <i className="fa-sharp fa-regular fa-circle-check fa-2xl successIcon" color= "#269018"></i>
            <button className="periButton" onClick={() => navigate("/login")}>
              Click here to login
            </button>
          </div>
        </div>
      </div>
    );  
};

export default Registered;