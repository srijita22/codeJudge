export default function OutputConsole({ output }) {
  return (
    <pre
      className="
    h-full
    overflow-y-auto
    overflow-x-hidden
    whitespace-pre-wrap
    break-words
    rounded-lg
    border
    border-border
    bg-background
    p-4
    font-mono
    text-sm
    text-primaryText
  "
    >
      {output || "Run your code to see the output."}
    </pre>
  );
}
