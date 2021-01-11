/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Question from "./Question";

const historyMock = { push: jest.fn() };

configure({ adapter: new Adapter() });
test("Question Snapshot test", () => {
  const component = renderer.create(
    <Question
    questionId = "1"
    questionCount= "10"
    onNext = { historyMock }
    onPrevious={ historyMock }
    onChange={ historyMock }
    submitTest={ historyMock }
    answer=""
    clearResponse={ historyMock }
    isQuizSubmitted = "false"
    quizTime= "600"
    options = {[]}
    questionId= "0"
    questionText="What is ReactJs in MVC?"
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
