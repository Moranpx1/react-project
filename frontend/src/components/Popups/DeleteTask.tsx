import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../Interfaces/Task";

const DeleteTask = (props: any) => {
  const taskObj = props.taskObj;
  const trigger = props.trigger;
  const setTrigger = props.setTrigger;
    
  return (
    <Modal isOpen = {trigger}>
      <ModalHeader>Delete task</ModalHeader>
      <ModalBody>
        <div>
            Are you sure you want the task to be deleted?
        </div>
          <ModalFooter>
            <Button color="info text-white" onClick={() => {setTrigger(false)}}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={() => setTrigger(false)}>
              No
            </Button>
          </ModalFooter>
      </ModalBody>
    </Modal>
  )
};

export default DeleteTask;
