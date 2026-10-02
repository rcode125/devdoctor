type Props = {
  fixes: string[];
};

export function FixSuggestion({ fixes }: Props) {
  if (fixes.length === 0) {
    return null;
  }

  return (
    <div className="fix-suggestions">
      <strong>Suggested fixes:</strong>
      <ul>
        {fixes.map((fix) => (
          <li key={fix}>{fix}</li>
        ))}
      </ul>
    </div>
  );
}
