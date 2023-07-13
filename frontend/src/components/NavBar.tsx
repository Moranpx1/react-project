import React from 'react';
import TaskList from './TaskList';

const NavBar = (props:any) => {
    const openCreateModal = props.openCreateModal;

    return (
      <div className="navBar">
        <span className='navUser'>
          <div className = "navHello">Moran Pikris</div>
          <i className=" fa-xl fa fa-arrow-right-from-bracket navIcon"></i>
        </span>
        <div className="navButton" onClick={openCreateModal}>
          Create Task
        </div>
        <input className="navSearch" placeholder="Search for a task..."></input>
        <i className=" fa-xl fa fa-search search-icon navIcon"></i>
      </div>
      
    );
};

export default NavBar;