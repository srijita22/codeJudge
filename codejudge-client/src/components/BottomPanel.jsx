import CustomInput from "./CustomInput";
import OutputConsole from "./OutputConsole";

export default function BottomPanel({ input, setInput, output }) {
  return (
    <div className="grid h-56 grid-cols-2 gap-4">
      {/*input*/}
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-surface px-4 py-3">
          <h3 className="font-semibold text-primaryText">Custom Input</h3>
        </div>

        <div className="flex-1 p-4">
          <CustomInput input={input} setInput={setInput} />
        </div>
      </div>

      {/* output*/}
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-surface px-4 py-3">
          <h3 className="font-semibold text-primaryText">Output</h3>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <OutputConsole output={output} />
        </div>
      </div>
    </div>
  );
}
