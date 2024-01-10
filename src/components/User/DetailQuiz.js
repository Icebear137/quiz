import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../api/apiServices";
import _ from "lodash";
import Question from "./Question";
import ModalResult from "./ModalResult";
import { set } from "nprogress";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestion();
    console.log("dataquiz:", dataQuiz);
  }, [quizId]);

  const fetchQuestion = async () => {
    let response = await getDataQuiz(quizId);
    console.log(response);
    if (response && response.EC == 0) {
      let raw = response.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionsDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionsDescription = item.description;
              image = item.image;
            }
            item.answers.isSelect = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionsDescription, image };
        })
        .value();
      console.log("data", data);
      setDataQuiz(data);
    }
  };

  const handleCheckbox = (aId, qId) => {
    let clone = _.cloneDeep(dataQuiz);
    let question = clone.find((item) => +item.questionId === +qId);
    if (question) {
      let answer = question.answers.find((item) => +item.id === +aId);
      if (answer) {
        answer.isSelect = !answer.isSelect;
      }
    }
    setDataQuiz(clone);
  };

  const handleNext = () => {
    if (index < dataQuiz.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item, index) => {
        let questionId = +item.questionId;
        let userAnswerId = [];
        item.answers.forEach((answer) => {
          if (answer.isSelect) {
            userAnswerId.push(answer.id);
          }
        });

        answers.push({ questionId, userAnswerId });
      });
    }
    payload.answers = answers;
    console.log(payload);
    let res = await postSubmitQuiz(payload);
    console.log(res);
    if (res && res.EC == 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setIsShowModal(true);
    }
  };

  return (
    <div className="flex gap-[20px] m-[20px]">
      <div className="border-solid border-[1px] border-[#ccc] shadow-sm w-[70%] p-[20px]">
        <div className="title">
          <span className="text-[30px] font-[600]">
            Quiz {quizId}: {location?.state?.quizTitle}
          </span>
        </div>
        <hr />
        <div className="body"></div>
        <div className="content">
          <Question
            handleCheckbox={handleCheckbox}
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <hr />
        <div className="footer flex gap-[30px] justify-center">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-danger" onClick={() => handleFinishQuiz()}>
            Finish
          </button>
        </div>
      </div>
      <div className="border-solid border-[1px] border-black w-[30%]">
        content
      </div>
      <ModalResult
        result={dataModalResult}
        show={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </div>
  );
};
export default DetailQuiz;
