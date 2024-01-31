import Select from "react-select";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { GoPlusCircle, GoNoEntry } from "react-icons/go";
import { CiCircleMinus } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";

const Questions = (props) => {
  const screenX = window.screen.availWidth;
  const options = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [description, setDescription] = useState("");
  const [questions, setQuestion] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answer: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      setQuestion([
        ...questions,
        {
          id: uuidv4(),
          description: "",
          imageFile: "",
          imageName: "",
          answer: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        },
      ]);
    }
    if (type === "REMOVE") {
      setQuestion(questions.filter((question) => question.id !== id));
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    if (type === "ADD") {
      setQuestion(
        questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              answer: [
                ...question.answer,
                {
                  id: uuidv4(),
                  description: "",
                  isCorrect: false,
                },
              ],
            };
          }
          return question;
        })
      );
    }
    if (type === "REMOVE") {
      setQuestion(
        questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              answer: question.answer.filter(
                (answer) => answer.id !== answerId
              ),
            };
          }
          return question;
        })
      );
    }
  };

  const handleOnChange = (type, questionId, answerId, value) => {
    if (type === "QUESTION") {
      setQuestion(
        questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              description: value,
            };
          }
          return question;
        })
      );
    }
    if (type === "ANSWER") {
      setQuestion(
        questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              answer: question.answer.map((answer) => {
                if (answer.id === answerId) {
                  return {
                    ...answer,
                    description: value,
                  };
                }
                return answer;
              }),
            };
          }
          return question;
        })
      );
    }
  };

  const handleOnChangeFileQuestion = (questionId, file) => {
    setQuestion(
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            imageFile: file,
            imageName: file.name,
          };
        }
        return question;
      })
    );
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    if (type === "CHECKBOX") {
      setQuestion(
        questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              answer: question.answer.map((answer) => {
                if (answer.id === answerId) {
                  return {
                    ...answer,
                    isCorrect: value,
                  };
                }
                return answer;
              }),
            };
          }
          return question;
        })
      );
    }
  };

  const handleSubmitQuestion = () => {
    console.log(questions);
  };

  return (
    <div className="container max-w-[1000px] lg:min-w-[900px] p-[20px]">
      <h1>Questions</h1>
      <div className="form-group flex flex-col m-auto w-full mb-[15px]">
        <label htmlFor="" className="pt-[15px] pb-[15px] text-start">
          Select Quiz
        </label>
        <Select
          className="w-full text-start z-10"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#dee2e6",
              height: "60px",
            }),
          }}
          defaultValue={options[0]}
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={options}
        />
      </div>
      <div className="pt-[15px] pb-[15px] text-start">Add Question</div>
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="mb-[20px]">
              <div className="flex gap-[15px] m-auto items-center ">
                <div className="basis-2/3 form-floating py-[10px]">
                  <FloatingLabel controlId="" label="Question's description">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={question.description}
                      onChange={(e) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          "",
                          e.target.value
                        )
                      }
                    />
                  </FloatingLabel>
                </div>
                <div className="basis-1/6 h-full p-[10px]">
                  <label
                    htmlFor={`${question.id}`}
                    className="m-auto p-[10px] cursor-pointer border-[1px] rounded-[5px] border-solid border-[#ccc] hover:border-black h-full"
                  >
                    {screenX > 600 ? "Upload Image" : "Image"}
                  </label>
                  <input
                    id={`${question.id}`}
                    onChange={(e) =>
                      handleOnChangeFileQuestion(question.id, e.target.files[0])
                    }
                    type="file"
                    hidden
                  />
                  <span>{question.imageName && question.imageName}</span>
                </div>
                <div className="flex flex-row gap-[15px] basis-1/6">
                  <span
                    onClick={() => handleAddRemoveQuestion("ADD", "")}
                    className="text-[30px] cursor-pointer text-[#919090] hover:text-black"
                  >
                    <GoPlusCircle />
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                      className="text-[30px] cursor-pointer text-[#919090] hover:text-black"
                    >
                      <GoNoEntry />
                    </span>
                  )}
                </div>
              </div>
              {console.log(question.answer)}
              {question.answer &&
                question.answer.length > 0 &&
                question.answer.map((answer, index) => {
                  return (
                    <div
                      key={answer.id}
                      className="flex items-center gap-[15px] mt-[15px]"
                    >
                      <Form.Check // prettier-ignore
                        checked={answer.isCorrect}
                        onChange={(e) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            question.id,
                            answer.id,
                            e.target.checked
                          )
                        }
                        type={"checkbox"}
                        className="basis-1/10 text-[20px] font-[300] ml-[15px] mt-[10px] mb-[10px]"
                      />
                      <div className="basis-2/3">
                        <FloatingLabel controlId="" label="Answer:">
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={answer.description}
                            onChange={(e) =>
                              handleOnChange(
                                "ANSWER",
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
                            className=""
                            // style={{ width: "500px" }}
                          />
                        </FloatingLabel>
                      </div>
                      <div className="flex flex-row gap-[15px] basis-1/6">
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", question.id, "")
                          }
                          className="text-[30px] cursor-pointer text-[#919090] hover:text-black"
                        >
                          <GoPlusCircle />
                        </span>
                        {question.answer.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id
                              )
                            }
                            className="text-[30px] cursor-pointer text-[#919090] hover:text-black"
                          >
                            <GoNoEntry />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      {questions && questions.length > 0 && (
        <div>
          <button
            onClick={() => handleSubmitQuestion()}
            className="bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
