import LanguageSelector from "./LanguageSelector";
import CodeEditor from "./CodeEditor";

export default function EditorPanel({
  language,
  setLanguage,
  code,
  setCode,
  handleRun,
  handleSubmit,
  navigate,
  verdict,
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card overflow-hidden">
       {/* toolbar...language selection thing and submit waale buttons */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <div className="flex items-center gap-3">
          {verdict && (
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                verdict.toLowerCase().includes("accepted")
                  ? "bg-success/20 text-success"
                  : verdict.toLowerCase().includes("wrong")
                    ? "bg-error/20 text-error"
                    : "bg-warning/20 text-warning"
              }`}
            >
              {verdict}
            </span>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRun}
              className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition hover:bg-accentHover"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-success px-4 py-2 font-medium text-white transition hover:brightness-110"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/my-submissions")}
              className="rounded-lg border border-border bg-background px-4 py-2 font-medium text-primaryText transition hover:border-accent"
            >
              My Submissions
            </button>
          </div>
        </div>
      </div>

      {/* editor (code writing part)*/}
      <div className="flex-1 overflow-hidden p-4">
        <CodeEditor code={code} setCode={setCode} />
      </div>
    </div>
  );
}
