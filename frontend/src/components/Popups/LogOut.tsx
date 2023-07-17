import React, {useContext, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";

const LogOut = (props: any) => {
    //Routing
    const navigate = useNavigate();

    const setTrigger = props.setTrigger;
    const trigger = props.trigger;
    const userName = props.userName;

    return (
        <Modal isOpen = {trigger}>
          <ModalHeader>Logout</ModalHeader>
          <ModalBody>
            <div>
                Are you sure you want to log out of {userName}?
            </div>
              <ModalFooter>
                <Button color="info text-white" onClick={()=> navigate("/login")}>
                  Yes
                </Button>{" "}
                <Button color="secondary" onClick={()=> setTrigger(false)}>
                  No
                </Button>
              </ModalFooter>
          </ModalBody>
        </Modal>
      )
};

export default LogOut;