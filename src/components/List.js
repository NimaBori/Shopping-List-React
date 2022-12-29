import React from "react";
import { Container } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const List = ({ title, id, onEdit, onDelete }) => {
  return (
    <Container
      style={{ width: "57%", height: "50px", padding: "0 20px" }}
      className="list-items animate__animated animate__slideInDown"
    >
      <div className="item-title">{title}</div>
      <div className="btns-container">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="tooltip-left">Edit item.</Tooltip>}
        >
          <button className="edit-btn" onClick={() => onEdit(id)}>
            <FaEdit />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="tooltip-right">Delete item.</Tooltip>}
        >
          <button className="delete-btn" onClick={() => onDelete(id)}>
            <FaTrash />
          </button>
        </OverlayTrigger>
      </div>
    </Container>
  );
};

export default List;
