import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../api/apiServices";
import { set } from "nprogress";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import UpdateQuestion from "./UpdateQuestion";
import AssignQuiz from "./AssignQuiz";

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      // setPreviewAvatar("");
    }
  };

  const handleSubmitQuiz = async () => {
    if (name === "" || description === "") {
      toast.error("Name/Description is required");
      return;
    }
    if (image === null) {
      toast.error("Image is required");
      return;
    }
    let res = await postCreateNewQuiz(
      description,
      name,
      type?.valueOf().value,
      image
    );
    if (res.EC === 0) {
      toast.success("Create new quiz successfully");
      setName("");
      setDescription("");
      setType("");
      setImage(null);
    }
    console.log(res);
  };

  const options = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];

  return (
    <div className="p-[15px] max-w-[1000px] flex flex-col m-auto">
      <div className="title w-full">
        <span className="text-[20px] font-[600]">Manage Quiz</span>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New QUiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new flex flex-col gap-[10px] p-[20px] border-solid border-[1px] border-[#ccc] shadow-md rounded-[5px]">
              <span className="text-[20px] font-[300] mb-[20px]">
                Add new quiz
              </span>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className=""
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Description">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
              <Select
                className="w-full text-start"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: "#dee2e6",
                    height: "60px",
                  }),
                }}
                defaultValue={options[0]}
                value={type}
                onChange={(selectedOption) => setType(selectedOption)}
                options={options}
                placeholder="Select quiz level"
              />

              <Form.Group
                controlId="formFile"
                className=" w-full flex flex-col items-start mt-[10px]"
              >
                <Form.Label className="text-start">
                  Upload quiz image:
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                />
              </Form.Group>
              <div
                className="btn btn-primary sm:min-w-[100px] sm:m-auto sm:mt-[10px]"
                onClick={() => handleSubmitQuiz()}
              >
                Save
              </div>
            </div>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Quiz</Accordion.Header>
          <Accordion.Body>
            <UpdateQuestion />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign Quiz</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
