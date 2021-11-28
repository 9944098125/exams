import { Component } from "react";
import Cookies from "js-cookie";

export default class Questions extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const questionsUrl =
      "http://testing-intern-api.herokuapp.com/api/question/questions";
    const options = {
      Authorization: {
        headers: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(questionsUrl, options);
    const data = response.json();
    console.log(data);
    const updatedData = data.map((question) => ({
      question_id: question.questionId,
      title: question.title,
      type: question.type,
      marks: question.marks,
    }));
    if (response.ok) {
      this.setState({
        questions: updatedData,
      });
    }
  };

  render() {
    const { questions } = this.state;

    return (
      <div className="branches">
        {questions.map((question) => (
          <li className="each-exam" key={question.questionId}>
            <p>{question.title}</p>
            <p>{question.type}</p>
            <p>{question.marks}</p>
          </li>
        ))}
      </div>
    );
  }
}
