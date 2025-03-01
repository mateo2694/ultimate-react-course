import { useEffect, useReducer } from "react";

import { Error } from "./components/Error";
import { FinishScreen } from "./components/FinishScreen";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { Main } from "./components/Main";
import { NextButon } from "./components/NextButton";
import { Progress } from "./components/Progress";
import { Question } from "./components/Question";
import { StartScreen } from "./components/StartScreen";
import { Timer } from "./components/Timer";

const SECONDS_PER_QUESTION = 10;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  const { questions, status, index, points, highscore, seconds } = state;
  const { correctOption, points: questionPoints } = questions[index] ?? {};

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: payload,
        points: points + (payload === correctOption ? questionPoints : 0),
      };
    case "nextQuestion":
      return { ...state, index: index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: points > highscore ? points : highscore,
      };
    case "tick":
      return {
        ...state,
        seconds: seconds - 1,
        status: seconds > 0 ? status : "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions,
        status: "ready",
        highscore,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;

  const maxPoints =
    questions.length &&
    questions.reduce((acc, { points }) => (acc += points), 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer seconds={seconds} dispatch={dispatch} />
              <NextButon
                dispatch={dispatch}
                answer={answer}
                index={index}
                numberOfQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
