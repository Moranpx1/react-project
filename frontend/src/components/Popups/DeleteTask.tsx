import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../../Interfaces/Task";
import deleteTaskApi from "../../Functions/API/deleteTaskApi";

const DeleteTask = (props: any) => {
  const taskId = props.taskId;
  const setTaskId = props.setTaskId;
  const deleteTask = props.deleteTask;

  const handleDelete = (taskId: string) => {

    //API
    deleteTaskApi(taskId)
    .then(() => {
        setTaskId("");
        deleteTask(taskId);
      })
      .catch((error) => {
        console.log("fail");
      });
    }
  

  return (
    <Modal isOpen={!!taskId}>
      <ModalHeader>Delete task</ModalHeader>
      <ModalBody>
        <div>Are you sure you want the task to be deleted?</div>
        <ModalFooter>
          <Button
            color="info text-white"
            onClick={() => {
              handleDelete(taskId);
            }}
          >
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={() => setTaskId("")}>
            No
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default DeleteTask;
