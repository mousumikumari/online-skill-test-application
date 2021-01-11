/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Question = (props) => {
  const {
    questionCount, questionId, submitTest, questionText, onNext, onPrevious, options,
  } = props;
  let second = props.quizTime % 60;
  let minute = Math.floor(props.quizTime / 60);
  minute = minute.toString().length === 1 ? `0${minute}` : minute;
  second = second.toString().length === 1 ? `0${second}` : second;

  if (second === "00" && minute === "00") {
    submitTest();
  }
  return (
    <div className="container">
      <div className="Countdown-time">
        Timer : {minute} : {second}
      </div>
      <div className="questions">
        <h4 id="question">
          Question {questionId + 1} : {questionText}
        </h4>
        <div id="">
          <div className="radio">
            {options.map((choice) => (
              <div key={choice}>
                <label className="radio-inline" htmlFor="{choice}">
                  <input
                    type="checkbox"
                    value={choice}
                    key={choice}
                    checked={
                      props.answer.length > 0
                        ? props.answer.includes(choice)
                        : false
                    }
                    onChange={() => props.onChange(choice)}
                  />
                  {choice}
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>

        {questionId !== 0 && (
          <Button
            variant="info"
            onClick={onPrevious}
            className="questionaireButton"
          >
            Previous
          </Button>
        )}
        {questionId < questionCount - 1 && (
          <Button
            variant="info"
            className="questionaireButton"
            onClick={onNext}
          >
            Next
          </Button>
        )}
        <Button
          variant="info"
          id="submitTest"
          onClick={submitTest}
          className="questionaireButton"
        >
          Submit Test
        </Button>
      </div>
    </div>
  );
};

Question.propTypes = {
  quizTime: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  submitTest: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  answer: PropTypes.func.isRequired,
  questionText: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  options: PropTypes.func.isRequired,
};

export default Question;
