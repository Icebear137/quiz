import { useState } from 'react';
import './ManageUsers.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import {toast} from 'react-toastify';



const AddUsersModal=(props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [roles, setRoles] = useState("USER");
    const [avatar, setAvatar] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState("");

  const handleClose = () => {
    setShow(false)
    setEmail("");
    setPassword("");
    setUsername("");
    setRoles("USER");
    setAvatar("");
    setPreviewAvatar("");
  };
  const handleShow = () => setShow(true);

    const handleUploadAvatar=(e)=>{
        if(e.target && e.target.files && e.target.files[0]){
            setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
            setAvatar(e.target.files[0]);
        }else{
            // setPreviewAvatar("");
        }
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

  const handleSubmit= async(e)=>{
        //validate
        const isValidEmail= validateEmail(email);
        if(!isValidEmail){
            toast.error('Invalid email');
            return;
        }
        if(!password){
            toast.error('Invalid password');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', username);
        formData.append('role', roles);
        formData.append('userImage', avatar);

        let res= await axios.post('http://localhost:8081/api/v1/participant', formData)
        if(res && res.data && res.data.EC===0){
            toast.success('Add user successfully');
            handleClose();
            await props.fetchListUserPaginate();
        }
        else{
            toast.error(res.data.EM);
        }
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button>

      <Modal 
        size='lg'
        show={show} 
        onHide={handleClose}
        >
        <Modal.Header closeButton>
          <Modal.Title>User infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} className="" controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="userRoles">
                <Form.Label>Roles</Form.Label>
                <Form.Select defaultValue="USER" onChange={(e)=>setRoles(e.target.value)}>
                    <option>USER</option>
                    <option>ADMIN</option>
                </Form.Select>
                </Form.Group>
            </Row>
            
            <Form.Group className='mb-3 ' controlId='userAvatar' >
                <Form.Label className='avatar-label'>
                    <BsPlusLg className='plus'/>
                    Avatar
                </Form.Label>
                <Form.Control type='file' hidden onChange={(e)=>handleUploadAvatar(e)}/>
                <div className='img-preview'>
                    {previewAvatar ?
                        <img src={previewAvatar} alt=''/>
                        :
                        <span>
                            Preview avatar
                        </span>
                    }
                </div>
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSubmit()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUsersModal;