import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { AiFillQuestionCircle } from "react-icons/ai";
import { GiTestTubes } from "react-icons/gi";
import { AiOutlineBranches } from "react-icons/ai";
import "./index.css";

export default function Home({ history }) {
  function logout() {
    Cookies.remove("jwt_token");
    history.replace("/login");
  }

  return (
    <div className="home-container">
      <div className="upper-para">
        <h1 className="home-head">
          A question is an utterance which typically functions as a request for
          information, which is expected to be provided in the form of an answer
        </h1>
        <h1 className="home-head">
          An examination (exam) is a test. Many things may be examined, but the
          word is most often used for an assessment of a person. It measures a
          test-taker's knowledge, skill, aptitude, physical fitness, or ability
          or standing in some other topic. It is a set of questions designed to
          measure those things
        </h1>
      </div>
      <div className="body">
        <Link to="/branch/branches" className="link">
          Branch <AiOutlineBranches />
        </Link>
        <Link to="/exam/exams" className="link">
          Exam <GiTestTubes />
        </Link>
        <Link to="/questions" className="link">
          Questions <AiFillQuestionCircle />
        </Link>
        <div className="btn-container">
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
