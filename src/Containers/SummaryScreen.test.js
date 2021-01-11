/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import SummaryScreen from "./SummaryScreen";

const location = {
  hash: "",
    key: "yuuhiji",
  pathname: "/SummaryScreen",
  search: "",
  state : {
    questionIndex: 0,
    isFalseLogin: false,
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
  },
}
test("First Submit Test Snapshot test", () => {
  const component = renderer.create(
    <SummaryScreen location= { location }/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
