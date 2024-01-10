import _, { hasIn } from "lodash";
import Form from "react-bootstrap/Form";

const Question = (props) => {
  const { data, index, handleCheckbox } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckbox = (aId, qId) => {
    handleCheckbox(aId, qId);
  };

  return (
    <>
      <div className="w-full h-[100px] flex justify-center">
        {data.image ? (
          <img
            className="max-w-full max-h-full"
            src={`data:image/jpeg;base64,${data.image}`}
          />
        ) : (
          <div className="max-w-full max-h-full"></div>
        )}
      </div>
      <div className="question text-[20px] font-[600]">
        <span>Question {index + 1}. </span>
        <span>{data.questionsDescription}</span>
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((item, index) => (
            <div key={index} className="mb-3">
              <Form.Check // prettier-ignore
                type={"checkbox"}
                checked={item.isSelect}
                id={`${index}`}
                label={`${item.description}`}
                className="text-[15px] font-[300] ml-[15px] mt-[10px] mb-[10px]"
                onChange={() => handleHandleCheckbox(item.id, data.questionId)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Question;
