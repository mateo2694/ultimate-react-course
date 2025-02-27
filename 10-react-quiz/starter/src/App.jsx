import { useEffect, useReducer } from "react";
import { Error } from "./components/Error";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { Main } from "./components/Main";
import { NextButon } from "./components/NextButton";
import { Question } from "./components/Question";
import { StartScreen } from "./components/StartScreen";
import { Progress } from "./components/Progress";
import { FinishScreen } from "./components/FinishScreen";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  const { type, payload } = action;
  const { questions, index, points, highscore } = state;
  const { correctOption, points: questionPoints } = questions[index] ?? {};

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
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
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

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
            <NextButon
              dispatch={dispatch}
              answer={answer}
              index={index}
              numberOfQuestions={numberOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
