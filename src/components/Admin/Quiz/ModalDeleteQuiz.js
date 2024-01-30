import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../api/apiServices";

const ModalDeleteQuiz = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = async (e) => {
    //call api delete user
    let res = await deleteQuizForAdmin(props.user.id);
    if (res.EC === 0) {
      toast.success("Delete quiz successfully");
      props.getAllQuiz();
    } else {
      toast.error("Delete quiz failed");
    }
    //close modal
    handleClose();
    //show toast
  };

  return (
    <>
      <Button variant="primary" className="btn-danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user {props.user.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
