import { MouseEvent } from "react";

const ListGroup = () => {
  let items = ["dog", "cat", "bunny"];
  // items = [];

  const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && "No items found"}
      <ul className = "list-group">
        {items.map((item) => (
          <li className = "list-group-item" key = {item} onClick = {handleClick}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;
