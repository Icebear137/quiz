import instance from "../utils/AxiosCustomize";

const getQuizbyUser = () => {
  return instance.get("api/v1/quiz-by-participant");
};

const getLogin = (email, password) => {
  return instance.post("api/v1/login", { email, password });
};

const getRegister = (username, email, password) => {
  return instance.post("api/v1/register", { username, email, password });
};

const getDataQuiz = (id) => {
  return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return instance.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  return instance.post("api/v1/quiz", formData);
};

const getAllQuizForAdmin = () => {
  return instance.get("api/v1/quiz/all");
};

const putUpdateQuizForAdmin = (
  id,
  name,
  description,
  difficulty,
  quizImage
) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  return instance.put(`api/v1/quiz`, formData);
};

const deleteQuizForAdmin = (id) => {
  return instance.delete(`api/v1/quiz/${id}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const formData = new FormData();
  formData.append("quiz_id", quiz_id);
  formData.append("description", description);
  formData.append("questionImage", questionImage);
  return instance.post(`api/v1/question`, formData);
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return instance.post(`api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};

export {
  getQuizbyUser,
  getLogin,
  getRegister,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuizForAdmin,
  deleteQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
};
