import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';   
import Task from '../Interfaces/Task'; 

const CreateTask = (props: any) => {
    const modal = props.modal;
    const toggle = props.toggle;
    const save = props.save;

    //Set values
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    //Handle save of task
    const handleSave = () => {
      let taskObj: Task = {
        id: '',
        taskName: taskName,
        description: description,
        date: date
      }
      return taskObj;
    }

    //Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
  
      if (name === 'taskName') {
        setTaskName(value);
      } else if (name === 'description') {
        setDescription(value);
      } else if (name === 'Deadline') {
        setDate(value);
      }
    };

    return (
     <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
            <form>
                <div className = 'form-group'>
                  <label>Task Name</label>
                  <input required type = 'text' className='fullWidth' value = {taskName} onChange = {handleChange} name = "taskName"></input>
                </div>
                <div className = 'form-group'>
                  <label>Description</label>
                   <textarea required rows={5} className='fullWidth' value = {description} onChange = {handleChange} name = "description"></textarea> 
                </div>
                <div className = 'form-group'>
                  <label>Deadline</label>
                  <br/>
                   <input required type = "date" value = {date} onChange = {handleChange} name = "Deadline"></input> 
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' color = 'info text-white' onClick={handleSave}>
            Create
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
};

export default CreateTask;