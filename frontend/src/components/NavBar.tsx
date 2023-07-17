import React, { useContext, useState } from 'react';
import TaskList from './TaskList';
import { UserNameContext } from '../contexts/userName';
import LogOut from './Popups/LogOut';

const NavBar = (props:any) => {
    //Context
    const {userName} = useContext(UserNameContext);

    const openCreateModal = props.openCreateModal; 

    //Modal
    const [toggleLogoutModal, setToggleLogoutModal] = useState(false);

    const handleLogout = () => {
      setToggleLogoutModal(true)
    }

    return (
      <>
      <div className="navBar">
        <span className='navUser'>
          <div className = "navHello">{userName}</div>
          <i className=" fa-xl fa fa-arrow-right-from-bracket navIcon" onClick={handleLogout}></i>
        </span>
        <div className="navButton" onClick={openCreateModal}>
          Create Task
        </div>
        <div className='navSearch'>
          <input className="navSearch" placeholder="Search for a task..."></input>
          <i className=" fa-xl fa fa-search search-icon navIcon"></i>
      </div>
      </div>
      <LogOut trigger = {toggleLogoutModal} setTrigger = {setToggleLogoutModal} userName = {userName}></LogOut>
      </>
    );
};

export default NavBar;