import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useState } from "react";

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

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
      <div className="add-new flex flex-col gap-[10px] p-[20px] border-solid border-[1px] border-[#ccc] shadow-md rounded-[5px]">
        <span className="text-[20px] font-[300] mb-[20px]">Add new quiz</span>
        <FloatingLabel controlId="floatingInput" label="Name" className="">
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
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={options}
          placeholder="Select quiz level"
        />
        <Form.Group
          controlId="formFile"
          className=" w-full flex flex-col items-start mt-[10px]"
        >
          <Form.Label className="text-start">Upload quiz image:</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
