export default function VerdictPanel({ verdict }) {
  const status = verdict || "Not Submitted";

  const badge = status.toLowerCase().includes("accepted")
    ? "bg-success/20 text-success"
    : status.toLowerCase().includes("wrong")
      ? "bg-error/20 text-error"
      : "bg-surface text-secondaryText";

  return (
    <div className="border-t border-border bg-surface p-5">
      <h3 className="mb-3 text-lg font-semibold text-primaryText">Verdict</h3>

      <span
        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${badge}`}
      >
        {status}
      </span>
    </div>
  );
}
