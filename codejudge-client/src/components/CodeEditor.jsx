export default function CodeEditor({ code, setCode }) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="// Write your code here."
      className="
      h-full
      w-full
      resize-none
      rounded-xl
      border
      border-border
      bg-background
      p-4
      font-mono
      text-sm
      text-primaryText
      outline-none
      transition
      focus:border-accent
      "
    />
  );
}
