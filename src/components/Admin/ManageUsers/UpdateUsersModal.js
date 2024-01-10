import { useEffect, useState } from 'react';
import './ManageUsers.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import {toast} from 'react-toastify';
import _ from 'lodash';



const UpdateUsersModal=(props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [roles, setRoles] = useState("USER");
    const [avatar, setAvatar] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState("");

    useEffect(()=>{
        if(!_.isEmpty(props.user)){
            setEmail(props.user.email);
            setPassword(props.user.password);
            setUsername(props.user.username);
            setRoles(props.user.roles);
            setAvatar("");
            if(props.user.image){
                setPreviewAvatar(`data:image/png;base64,${props.user.image}`);
            }
        }
    },[props.user]);


  const handleClose = () => {
    setShow(false)
    setEmail("");
    setPassword("");
    setUsername("");
    setRoles("USER");
    setAvatar("");
    setPreviewAvatar("");
    //reset user data
  };
  const handleShow = (user) => {
    setShow(true);
    console.log(props.user);
  }
    const handleUploadAvatar=(e)=>{
        if(e.target && e.target.files && e.target.files[0]){
            setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
            setAvatar(e.target.files[0]);
        }else{
            // setPreviewAvatar("");
        }
    }


  const handleSubmit= async(e)=>{

        const formData = new FormData();
        formData.append('id', props.user.id);
        formData.append('username', username);
        formData.append('role', roles);
        formData.append('userImage', avatar);

        let res= await axios.put('http://localhost:8081/api/v1/participant', formData)
        if(res && res.data && res.data.EC===0){
            toast.success(res.data.EM);
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
        Edit
      </Button>

      <Modal 
        size='lg'
        show={show} 
        onHide={handleClose}
        >
        <Modal.Header closeButton>
          <Modal.Title>Update user infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} disabled onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} disabled onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} className="" controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="userRoles">
                <Form.Label>Roles</Form.Label>
                <Form.Select defaultValue={props.user.role} onChange={(e)=>setRoles(e.target.value)}>
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

export default UpdateUsersModal;