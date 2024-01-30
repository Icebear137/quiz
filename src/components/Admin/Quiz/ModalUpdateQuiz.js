import { useEffect, useState } from "react";
import "./ManageUsers.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsPlusLg } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuizForAdmin } from "../../../api/apiServices";
import { set } from "nprogress";

const ModalUpdateQuiz = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    if (!_.isEmpty(props.user)) {
      setName(props.user.name);
      setDescription(props.user.description);
      setDifficulty(props.user.difficulty);
      setAvatar("");
      if (props.user.image) {
        setPreviewAvatar(`data:image/png;base64,${props.user.image}`);
      }
    }
  }, [props.user]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setDifficulty("");
    setAvatar("");
    setPreviewAvatar("");
    //reset user data
  };
  const handleShow = (user) => {
    setShow(true);
    console.log(props.user);
  };
  const handleUploadAvatar = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    } else {
      // setPreviewAvatar("");
    }
  };

  const handleSubmit = async (e) => {
    let res = await putUpdateQuizForAdmin(
      props.user.id,
      name,
      description,
      difficulty,
      avatar
    );
    console.log(res);
    if (res.EC === 0) {
      toast.success("Update quiz successfully");
      props.getAllQuiz();
    } else {
      toast.error("Update quiz failed");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DESCRIPTION"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  defaultValue={props.user.difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option>EASY</option>
                  <option>MEDIUM</option>
                  <option>HARD</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3 " controlId="userAvatar">
              <Form.Label className="avatar-label">
                <BsPlusLg className="plus" />
                <span>Upload Image</span>
              </Form.Label>
              <Form.Control
                type="file"
                hidden
                onChange={(e) => handleUploadAvatar(e)}
              />
              <div className="img-preview">
                {previewAvatar ? (
                  <img src={previewAvatar} alt="" />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
