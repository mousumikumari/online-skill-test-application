/* eslint-disable linebreak-style */
import React, { Component } from "react";
import _ from "lodash";
import level0Question from "../../Components/Data/Questions.json";
import level1Question from "../../Components/Data/Questionlevel1.json";
import level2Question from "../../Components/Data/Questionlevel2.json";
import Question from "./Question/Question";
import { logout } from "../../Components/Utilities/Index";

const skillLevels = ["Level 1", "Level 2", "Level 3"];

let initialState = {
  questionIndex: 0,
  quizTime: 600,
  questionCount: 0,
  IsQuizSubmitted: false,
  skillLevel: "",
  questionData: "",
  candidateDetails: [],
  candidateResponses: [],
  currentResponse: [],
  questionsAttempted: 0,
  candidateScore: 0,
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  password: "",
};
export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.setInitialState();
    this.state = JSON.parse(localStorage.getItem("state"))
      ? JSON.parse(localStorage.getItem("state"))
      : initialState;
    this.updateLocalStorage();
  }

  componentDidMount() {
    const { history } = this.props;
    this.timer = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      const newCount = this.state.quizTime - 1;
      this.setState({ quizTime: newCount >= 0 ? newCount : 0 });
      this.updateLocalStorage();
    }, 1000);
    window.addEventListener("popstate", () => {
      history.push("/Questions");
    });
  }

  /**
   * Reset Timer on quiz over
   */
  resetTimer = () => {
    this.setState({
      quizTime: 600,
    });
  };

  /**
   * Display next question
   */
  nextQuestion = () => {
    const {
      currentResponse,
      questionIndex,
      questionData,
      candidateResponses,
    } = this.state;
    const isAnswerCorrect = JSON.stringify(currentResponse)
    === JSON.stringify(questionData[questionIndex].answer);
    const isQuestionAttempted = currentResponse.length > 0;
    candidateResponses.push({
      id: questionIndex,
      Question: questionData[questionIndex].question,
      Response: currentResponse,
      Answer: questionData[questionIndex].answer,
      IsAnswerCorrect: isAnswerCorrect,
      IsAttempted: isQuestionAttempted,
    });
    const questIndex = questionIndex + 1;
    const questionResponse = candidateResponses.filter(
      (a) => a.id === questIndex,
    );
    let response = [];
    if (questionResponse.length !== 0) {
      response = questionResponse[0].Response;
    }
    this.setState(
      {
        questionIndex: questIndex,
        currentResponse: response,
      },
      () => this.updateLocalStorage(),
    );
  };

  /**
   *Save the choice selected
   *
   * @param {string} event choice of question selected
  */
  choiceSelected = (event) => {
    const { currentResponse } = this.state;
    if (currentResponse.includes(event)) {
      currentResponse.splice(currentResponse.indexOf(event), 1);
    } else {
      currentResponse.push(event);
    }
    this.updateLocalStorage();
  };

  /**
   * Display Previous qestion in the questionaire
  */
  previousQuestion = () => {
    const { questionIndex, candidateResponses } = this.state;
    const questionResponse = candidateResponses.filter(
      (a) => a.id === questionIndex - 1,
    );
    let response = [];
    if (questionResponse.length !== 0) {
      response = questionResponse[0].Response;
      candidateResponses.splice(questionIndex - 1, 1);
    } else {
      candidateResponses.splice(questionIndex - 1, 1);
    }
    this.setState(
      {
        questionIndex: questionIndex - 1,
        currentResponse: response,
      },
      () => this.updateLocalStorage(),
    );
  };

  /**
* Download JSON file of the Candidate Responses
*/
  downloadFile = async () => {
    const { candidateResponses } = this.state;
    const myData = candidateResponses;
    const fileName = "CandidateDetails";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.updateLocalStorage();
  };

  /**
  * Submit candidate answers
  */
  submitTest = () => {
    const {
      currentResponse,
      questionIndex,
      questionData,
      candidateResponses,
    } = this.state;
    const isAnswerCorrect = JSON.stringify(currentResponse)
    === JSON.stringify(questionData[questionIndex].answer);
    const isQuestionAttempted = currentResponse.length > 0;
    candidateResponses.push({
      id: questionIndex,
      Question: questionData[questionIndex].question,
      Response: currentResponse,
      Answer: questionData[questionIndex].answer,
      IsAnswerCorrect: isAnswerCorrect,
      IsAttempted: isQuestionAttempted,
    });
    const { history } = this.props;
    const correctAnswers = candidateResponses.filter(
      (c) => c.IsAnswerCorrect === true,
    ).length;
    const questionsAttempt = candidateResponses.filter(
      (c) => c.IsAttempted === true,
    ).length;
    this.setState(
      {
        candidateScore: correctAnswers,
        questionsAttempted: questionsAttempt,
        IsQuizSubmitted: true,
      },
      () => {
        this.resetTimer();
        this.downloadFile();
        logout();
        history.push({
          pathname: "/SummaryScreen",
          state: { ...this.state },
        });
      },
    );
  };

  setInitialState() {
    if (!JSON.parse(localStorage.getItem("state"))) {
      const userData = JSON.parse(localStorage.getItem("userInformation"));
      const level = _.get(this.props, "location.state.skillLevel");
      let questionsd = [];
      if (level === skillLevels[0]) {
        questionsd = level0Question.questions;
      } else if (level === skillLevels[1]) {
        questionsd = level1Question.questions;
      } else {
        questionsd = level2Question.questions;
      }
      initialState = {
        skillLevel: level,
        questionData: questionsd,
        questionCount: questionsd.length,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        email: userData.email,
        gender: userData.gender,
        isRegistered: userData.isRegistered,
        questionIndex: 0,
        quizTime: 600,
        candidateDetails: [],
        candidateResponses: [],
        currentResponse: [],
        questionsAttempted: 0,
        candidateScore: 0,
      };
    }
  }

  updateLocalStorage() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    const {
      questionIndex,
      questionData,
      questionCount,
      quizTime,
      currentResponse,
    } = this.state;

    return (
      <Question
        questionId={questionIndex}
        questionText={questionData[questionIndex].question}
        options={questionData[questionIndex].options}
        questionCount={questionCount}
        onNext={this.nextQuestion}
        onPrevious={this.previousQuestion}
        onChange={this.choiceSelected}
        submitTest={this.submitTest}
        answer={currentResponse}
        quizTime={quizTime}
      />
    );
  }
}

Questions.propTypes = {
  history: Object.isRequired,
};
