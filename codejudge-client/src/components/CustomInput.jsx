export default function CustomInput({ input, setInput }) {
  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter custom input."
      className="
      h-full
      w-full
      resize-none
      rounded-lg
      border
      border-border
      bg-background
      p-4
      font-mono
      text-sm
      text-primaryText
      outline-none
      focus:border-accent
      "
    />
  );
}
