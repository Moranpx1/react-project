import React, {useState} from 'react';
import axios from 'axios';
import "./css/App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateTask from './modals/CreateTask';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
import Task from './Interfaces/Task';   

const TaskList = () => {
    
    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //Set and save tasks
    const [taskList, setTaskList] = useState<Task[]>([]);   

    const saveTask = (taskObj: Task) => {
        const tempList = [...taskList];
        tempList.push(taskObj);
        setTaskList(tempList);
    }

    return (
        <>
            <div className = 'header text-center'>
                <div className = 'heading text-info'>Todoos</div>
                <button className = 'btn btn-info text-white' onClick = {() => setModal(true)}>Create Task</button>
            </div>

            <div className = 'taskContainer'>
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask()}/>
        </>
    );
};

export default TaskList;