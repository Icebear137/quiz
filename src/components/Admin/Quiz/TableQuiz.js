import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllQuizForAdmin } from "../../../api/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = ({ quiz }) => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    getAllQuiz();
  }, []);

  const getAllQuiz = async () => {
    try {
      const res = await getAllQuizForAdmin();
      console.log(res);
      if (res && res.EC === 0) {
        setListQuiz(res.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table striped bordered hover className="mt-[10px]">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.difficulty}</td>
              <td className="flex gap-[15px]">
                <ModalUpdateQuiz user={item} getAllQuiz={getAllQuiz} />
                <ModalDeleteQuiz user={item} getAllQuiz={getAllQuiz} />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableQuiz;
