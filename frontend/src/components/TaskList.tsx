import React, {useState} from 'react';
import axios from 'axios';
import "./css/App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateTask from './modals/CreateTask';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
import Task from './Interfaces/Task';   
import Card from './Card'

const TaskList = () => {
    
    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //Set and save tasks
    const [taskList, setTaskList] = useState<Task[]>([]);   

    const saveTask = (taskObj: Task) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        setTaskList(tempList);
        console.log(taskObj.date)
        setModal(false);

        //Setting data
        // localStorage.setItem("taskList", JSON.stringify(tempList))
    }

    //Delete task
    const deleteTask = (taskId: string) => {
        const tempList = taskList.filter(task => task.taskId !== taskId);
        setTaskList(tempList);
        // localStorage.setItem("taskList", JSON.stringify(tempList));
    };

    return (
        <>
            <div className = 'header text-center'>
                {/* <div className = 'heading'>Todoos</div> */}
                <button className = 'bigButton' onClick = {() => setModal(true)}>Create Task</button>
            </div>
            
            <div className='centerTaskContainer'> 
                <div className = 'task-container'>
                    {taskList.map((obj) => <Card key = {obj.taskId} taskObj = {obj} deleteTask = {deleteTask}/>)}
                </div>
                <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
            </div>  
        </>
    );
};

export default TaskList;