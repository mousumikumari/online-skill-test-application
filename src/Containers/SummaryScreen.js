import React from "react";

const summaryScreen = ({ location }) => {
  const { state } = location;
  return (
    <div className="container">
      <h4>Thank You! </h4>
      <p>
        <b>Name :</b> {state.firstName} {state.lastName}
        <br />
        <b>Email :</b> {state.email}
        <br />
        <b>Questions Attempted : </b>
        <span className="number-score">
          {state.questionsAttempted} / {state.questionCount}
        </span>
        <br />
        <b>Score :</b>{" "}
        <span className="number-score">
          {state.candidateScore} / {state.questionCount}
        </span>
      </p>
    </div>
  );
};

summaryScreen.propTypes = {
  location: Object.isRequired,
};

export default summaryScreen;
