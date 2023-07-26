import React, { useContext, useState } from "react";
import TaskList from "./TaskList";
import { UserNameContext } from "../contexts/userName";
import LogOut from "./Popups/LogOut";

const NavBar = (props: any) => {
  //Context
  const { userName } = useContext(UserNameContext);

  const openCreateModal = props.openCreateModal;

  //Modal
  const [toggleLogoutModal, setToggleLogoutModal] = useState(false);

  const handleLogout = () => {
    setToggleLogoutModal(true);
  };

  //input field
  const { searchQuery, setSearchQuery } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  //Add X in input

  return (
    <>
      <div className="navBar sticky-top">
        <span className="navUser">
          <div className="navHello">Hello {userName}</div>
          <i
            className=" fa-xl fa fa-arrow-right-from-bracket navIcon"
            onClick={handleLogout}
          ></i>
        </span>
        <span className="navButtonContainer">
          <div className="navButton" onClick={openCreateModal}>
            Create Task
          </div>
        </span>
        <div className="navSearch">
          <input
            value={searchQuery}
            className="navSearch"
            placeholder="Search for a task..."
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <LogOut
        trigger={toggleLogoutModal}
        setTrigger={setToggleLogoutModal}
        userName={userName}
      ></LogOut>
    </>
  );
};

export default NavBar;
