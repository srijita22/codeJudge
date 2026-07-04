import VerdictPanel from "./VerdictPanel";

export default function ProblemPanel({
  title,
  difficulty,
  description,
  verdict,
}) 
{
  const badgeColor =
    difficulty?.toLowerCase() === "easy"
      ? "bg-success/20 text-success"
      : difficulty?.toLowerCase() === "medium"
        ? "bg-warning/20 text-warning"
        : "bg-error/20 text-error";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/*header */}
      <div className="border-b border-border bg-surface px-6 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primaryText">{title}</h1>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeColor}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/*description */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <h2 className="mb-4 text-xl font-semibold text-primaryText">Problem</h2>

        <div className="whitespace-pre-wrap leading-8 text-secondaryText">
          {description}
        </div>
      </div>

      {/* verdict */}
      <VerdictPanel verdict={verdict} />
    </div>
  );
}
