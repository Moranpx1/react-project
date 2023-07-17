import React, {useContext, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LogOut = (props: any) => {
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
                <Button color="info text-white">
                  Yes
                </Button>{" "}
                <Button color="secondary" on>
                  No
                </Button>
              </ModalFooter>
          </ModalBody>
        </Modal>
      )
};

export default LogOut;