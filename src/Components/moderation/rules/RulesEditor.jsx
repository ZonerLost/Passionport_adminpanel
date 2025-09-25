import React, { useState } from "react";
import SectionCard from "../../ui/common/SectionCard";

export default function RulesEditor({ data, onSave }) {
  const [state, setState] = useState(data);
  const save = () => onSave(state);

  function addKeyword() {
    const k = prompt("Add keyword:");
    if (!k) return;
    setState((s) => ({
      ...s,
      keywords: [...new Set([...(s.keywords || []), k.toLowerCase()])],
    }));
  }
  function rmKeyword(k) {
    setState((s) => ({
      ...s,
      keywords: (s.keywords || []).filter((x) => x !== k),
    }));
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Keyword Rules">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {(state.keywords || []).map((k) => (
            <span
              key={k}
              className="px-2 py-0.5 rounded text-xs"
              style={{ background: "#111827", color: "#93c5fd" }}
            >
              {k}{" "}
              <button className="ml-2 underline" onClick={() => rmKeyword(k)}>
                remove
              </button>
            </span>
          ))}
          <button
            className="h-8 px-3 text-gray-400 rounded-lg border text-xs"
            onClick={addKeyword}
            style={{ borderColor: "rgba(110,86,207,0.25)" }}
          >
            Add
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Image & Link Thresholds">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Nudity Threshold (0-1)
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              defaultValue={state.image.nudityThreshold}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  image: {
                    ...s.image,
                    nudityThreshold: Number(e.target.value),
                  },
                }))
              }
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>
          <label className="text-xs text-slate-400">
            Link Risk Threshold (0-1)
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              defaultValue={state.links.riskThreshold}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  links: { ...s.links, riskThreshold: Number(e.target.value) },
                }))
              }
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>
        </div>
      </SectionCard>

      <button
        onClick={save}
        className="h-9 px-3 text-gray-400 rounded-lg border text-sm"
        style={{ borderColor: "rgba(110,86,207,0.25)" }}
      >
        Save Rules
      </button>
    </div>
  );
}
