/* eslint-disable react/prop-types */

export function FinishScreen({ points, maxPoints, highscore }) {
  const percentage = Math.ceil((points / maxPoints) * 100);

  let emoji = "🥇";
  if (percentage < 100) emoji = "🥳";
  if (percentage < 80) emoji = "😉";
  if (percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦🏻‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}
