import Select from "react-select";
import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { GoPlusCircle, GoNoEntry } from "react-icons/go";
import { CiCircleMinus } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "yet-another-react-lightbox";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../api/apiServices";

const UpdateQuestion = (props) => {
  const screenX = window.screen.availWidth;
  const [isPreviewImage, setIsPreviewImage] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestion] = useState([
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

  const initQuestion = [
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
  ];

  const [dataImagePreview, setDataImagePreview] = useState({
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
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
    console.log(response);
  };

  const handlePreviewImage = (questionId) => {
    const question = questions.find((question) => question.id === questionId);
    if (question) {
      setDataImagePreview({
        url:
          question.imageFile instanceof Blob
            ? URL.createObjectURL(question.imageFile)
            : question.imageFile,
      });
      setIsPreviewImage(true);
    }
  };

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

  const handleSubmitQuestion = async () => {
    console.log(questions);
    //validate
    if (!selectedQuiz.value) {
      toast.error("Please select quiz");
      return;
    }
    //validate answer
    for (const question of questions) {
      if (!question.description) {
        toast.error("Please enter question's description");
        return;
      }
      if (question.answer.length < 2) {
        toast.error("Please enter at least 2 answer");
        return;
      }
      for (const answer of question.answer) {
        if (!answer.description) {
          toast.error("Please enter answer's description");
          return;
        }
      }
    }

    //each question must have at least 1 correct answer
    for (const question of questions) {
      const correctAnswer = question.answer.find(
        (answer) => answer.isCorrect === true
      );
      if (!correctAnswer) {
        toast.error("Each question must have at least 1 correct answer");
        return;
      }
    }

    //submit question
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      //submit answer
      for (const answer of question.answer) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }

    toast.success("Submit question successfully");
    setQuestion(initQuestion);
  };

  return (
    <div className="container max-w-[1000px] lg:min-w-[900px] p-[20px]">
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
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
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
                  {question.imageName ? (
                    <span
                      className="cursor-pointer text-[#919090] hover:text-black"
                      onClick={() => handlePreviewImage(question.id)}
                    >
                      {question.imageName}
                    </span>
                  ) : null}
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
      {isPreviewImage === true && (
        <Lightbox
          close={() => setIsPreviewImage(false)}
          slides={[
            {
              src: dataImagePreview.url,
            },
          ]}
        />
      )}
    </div>
  );
};

export default UpdateQuestion;
