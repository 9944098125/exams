import { Component } from "react";
import Cookies from "js-cookie";

export default class Exams extends Component {
  state = {
    exams: [],
  };

  componentDidMount() {
    this.getExams();
  }

  getExams = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get("jwt_token");
    const examsUrl = "http://testing-intern-api.herokuapp.com/api/exam/exams";
    const options = {
      Authorization: {
        headers: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(examsUrl, options);
    const data = response.json();
    console.log(data);
    const updatedData = data.map((exam) => ({
      exam_id: exam.examId,
      name: exam.name,
      date: exam.date,
      duration: exam.duration,
      question_count: exam.questionCount,
    }));
    if (response.ok) {
      this.setState({
        exams: updatedData,
      });
    }
  };

  render() {
    const { exams } = this.state;

    return (
      <div className="branches">
        {exams.map((exam) => (
          <li className="each-exam" key={exam.examId}>
            <p>{exam.name}</p>
            <p>{exam.date}</p>
            <p>{exam.duration}</p>
            <p>{exam.questionCount}</p>
          </li>
        ))}
      </div>
    );
  }
}
