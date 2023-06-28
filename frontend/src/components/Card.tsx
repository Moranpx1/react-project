import React, { useState } from 'react';
import Task from './Interfaces/Task';
import UpdateTask from './modals/UpdateTask';

//Colors
  const baseColor = {
    primary: 'lightblue',
    secondary: '#e3e9eb'
  }

  const alertColor = {
    primary: '#e18e8e',
    secondary: '#ebe3e3'
  }
  
  const checkColor = {
    primary: '#93dd86',
    secondary: '#e8f3d4'
  }

    interface CardProps {
        taskObj: Task;
        deleteTask: (taskId: string) => void;
      }
      
      const Card: React.FC<CardProps> = ({taskObj, deleteTask}) => {
        
        const [modal, setModal] = useState(false);
        const toggle = () => {
            setModal(!modal);
        }


        //Initialize card with base color
        const [color, setColor] = useState(baseColor);

        const handleDelete = () => {
            deleteTask(taskObj.taskId);
            console.log("Task deleted")
        }

        const handleCheck = () => {
            setColor(checkColor);
        }

        const updateTask = (obj: Task) => {
            
        }
        
        return(    
            <div className="card-wrapper">
            <div className="card-top" style={{ backgroundColor: color.primary }}></div>
            <div className="task-holder">
                <span className="card-header" style={{ backgroundColor: color.secondary, borderRadius: '10px' }}>
                {taskObj.taskName}
                </span>
                <p className="mt-3">{taskObj.description}</p>
        
                {/* icons */}
                <div style={{ position: 'absolute', right: '20px', top: '20px' }}>
                {/* check icon */}
                <i className="fas fa-check icon" onClick = {handleCheck}></i>
                </div>
                <div style={{ position: 'absolute', right: '20px', bottom: '20px' }}>
                {/* edit icon */}
                <i className="far fa-edit icon" onClick = {() => setModal(true)}></i>
                {/* delete icon */}
                <i className="fas fa-trash-alt icon" onClick = {handleDelete}></i>
                </div>
                <div className="date" style={{ position: 'absolute', left: '20px', bottom: '20px' }}>
                {taskObj.date}
                </div>
            </div>
            <UpdateTask toggle = {toggle} modal = {modal} updateTask = {updateTask({Task})} taskObj = {taskObj}/>
        </div>
        )
      };

export default Card;