import React from 'react'
import { Button} from "react-bootstrap";

const Question = (props) => {
  const { quizTime, questionCount, questionId } = props;
  let second = quizTime % 60;
  let minute = Math.floor(quizTime / 60);
  minute = minute.toString().length === 1 ? `0${minute}` : minute;
  second = second.toString().length === 1 ? `0${second}` : second;
  const { submitTest } = props;

  if (second === "00" && minute === "00") {
    submitTest();
  }
  return(
    <div className="container">
     <div className="Countdown-time">
        Timer :
        {" "}
        {minute}
        {" "}
        :
        {" "}
        {second}
      </div>
      <div className="questions">
        <h4 id="question">
          Question
          {" "}
          {props.questionId + 1}
          {" "}
          :
          {" "}
          {props.questionText}
        </h4>
        <div id="">
          <div className="radio">
            {props.options.map((choice) => (
              <div key={choice}>
                <label className="radio-inline" htmlFor="{choice}">
                  <input
                    type="checkbox"
                    value={choice}
                    key={choice}
                    checked={props.answer.length > 0 ? props.answer.includes(choice) : false}
                    onChange={() => props.onChange(choice)}
                  />
                  {choice}
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>

        {props.questionId !== 0 && (
        <Button
          variant="info"
          onClick={props.onPrevious}
          className="questionaireButton">
          Previous
        </Button>
        )}
        {props.questionId < props.questionCount - 1 && (
        <Button
          variant="info"
          className="questionaireButton"
          onClick={props.onNext}
        >
          Next
        </Button>
        )}
        <Button
          variant="info"
          id="submitTest"
          onClick={props.submitTest}
          className="questionaireButton">
          Submit Test
        </Button>
      </div>
    </div>
  );
};
export default Question