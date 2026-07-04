import { Code2 } from "lucide-react";

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="flex items-center gap-3">
      <Code2 size={18} className="text-secondaryText" />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="
        rounded-lg
        border
        border-border
        bg-background
        px-3
        py-2
        text-primaryText
        outline-none
        focus:border-accent
        "
      >
        <option value="cpp">C++</option>
        <option value="python">Python 3</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
      </select>
    </div>
  );
}
