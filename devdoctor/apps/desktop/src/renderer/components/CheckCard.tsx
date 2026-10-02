import type { CheckResult } from "../../../../../packages/checks/src/index.js";

type Props = {
  result: CheckResult;
};

export function CheckCard({ result }: Props) {
  return (
    <div className={`check-card check-${result.status}`}>
      <h3>{result.name}</h3>
      <p>{result.message}</p>
      {result.details.length > 0 && (
        <ul>
          {result.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
