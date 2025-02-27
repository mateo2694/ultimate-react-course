/* eslint-disable react/prop-types */

export function Progress({
  index,
  numberOfQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer != null)}
      />
      <p>
        <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
