import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {toast} from 'react-toastify';

const DeleteUserModal=(props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = async(e) => {
    //call api delete user
    let res = await axios.delete(`http://localhost:8081/api/v1/participant`,{data:{id:props.user.id}});
    if(res && res.data && res.data.EC===0){
        toast.success(res.data.EM);
        handleClose();
        await props.fetchListUserPaginate();
    }
    else{
        toast.error(res.data.EM);
    }
    //close modal
    handleClose();
    //show toast
  }

  return (
    <>
      <Button variant="primary" className='btn-danger' onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user {props.user.email}</Modal.Body>
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
}

export default DeleteUserModal;