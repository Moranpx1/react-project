import React, { useContext, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logoutApi from "../../Functions/API/logoutApi";

const LogOut = (props: any) => {
  //Routing
  const navigate = useNavigate();

  const setTrigger = props.setTrigger;
  const trigger = props.trigger;
  const userName = props.userName;

  const logOut = () => {
    logoutApi()
      .then((response) => {
        console.log("success");
        navigate("/login");
      })
      .catch((error) => {
        console.log("failes to logout");
      });
  };

  return (
    <Modal isOpen={trigger}>
      <ModalHeader>Logout</ModalHeader>
      <ModalBody>
        <div>Are you sure you want to log out of {userName}?</div>
        <ModalFooter>
          <Button color="info text-white" onClick={() => logOut()}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={() => setTrigger(false)}>
            No
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default LogOut;
