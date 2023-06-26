import React, {useState} from 'react';
import axios from 'axios';
import "./css/App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateTask from './modals/CreateTask';

const TaskList = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <div className = 'header text-center'>
                <div className = 'heading'>Todoos</div>
                <button className = 'bigButton mt-2' onClick = {() => setModal(true)}>Create Task</button>
            </div>

            <div className = 'taskContainer'>
            </div>
            <CreateTask toggle = {toggle} modal = {modal}/>
        </>
    );
};

export default TaskList;