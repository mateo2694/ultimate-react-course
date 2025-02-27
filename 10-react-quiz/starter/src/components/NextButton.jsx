/* eslint-disable react/prop-types */

export function NextButon({ dispatch, answer, index, numberOfQuestions }) {
  if (index === numberOfQuestions - 1 && answer !== null)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );

  return (
    answer !== null && (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    )
  );
}
