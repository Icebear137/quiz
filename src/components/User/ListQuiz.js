import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { getQuizbyUser } from "../../api/apiServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const getQuizData = async () => {
    try {
      const response = await getQuizbyUser();
      console.log(response);
      setQuiz(response.DT);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getQuizData();
  }, [navigate, isAuthenticated]);

  return (
    <div className="list-quiz flex flex-row flex-wrap gap-[30px] m-[20px]">
      {quiz && quiz.length > 0 ? (
        quiz.map((item, index) => (
          <Card key={index} className="mb-3">
            <Card.Body className="w-[300px] ">
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${item.image}`}
              />
              <Card.Title>Quiz {index + 1}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button
                onClick={() =>
                  navigate(`/quiz/${item.id}`, {
                    state: { quizTitle: item.description },
                  })
                }
                variant="primary"
              >
                Start
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center">No quiz available</div>
      )}
    </div>
  );
};

export default ListQuiz;
