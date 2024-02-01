import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUser } from "../../../api/apiServices";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [listUser, setListUser] = useState([{}]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    const response = await getAllQuizForAdmin();
    if (response.EC === 0) {
      let getListQuiz = response.DT.map((quiz) => {
        return {
          value: quiz.id,
          label: quiz.name,
        };
      });
      setListQuiz(getListQuiz);
    }
  };

  const fetchUser = async () => {
    const response = await getAllUser();
    if (response.EC === 0) {
      let getListUser = response.DT.map((user) => {
        return {
          value: user.id,
          label: user.username,
        };
      });
      setListUser(getListUser);
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-[20px] w-full">
        <div className="basis-1/2">
          <label>Select quiz</label>
          <Select
            options={listQuiz}
            onChange={(e) => setSelectedQuiz(e)}
            value={selectedQuiz}
          />
        </div>
        <div className="basis-1/2">
          <label>Select User</label>
          <Select
            options={listUser}
            onChange={(e) => setSelectedUser(e)}
            value={selectedUser}
          />
        </div>
      </div>
      <div className="mt-[20px]">
        <button className="btn btn-primary">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
