import React, { useEffect, useState } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function AnnouncementEditorDrawer({
  open,
  announcement,
  segments,
  onClose,
  onSave,
  onSchedule,
}) {
  const [state, setState] = useState(announcement || null);
  const [sched, setSched] = useState({ start: "", end: "" });

  useEffect(() => {
    setState(announcement || null);
    setSched({
      start: announcement?.startAt?.slice(0, 16) || "",
      end: announcement?.endAt?.slice(0, 16) || "",
    });
  }, [announcement]);

  if (!open || !state) return null;

  const toggleSegment = (id) =>
    setState((s) => {
      const set = new Set(s.segments || []);
      set.has(id) ? set.delete(id) : set.add(id);
      return { ...s, segments: [...set] };
    });

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">
            Edit Announcement
          </div>
          <div className="text-sm text-slate-300">{state.id}</div>
        </div>

        <div className="p-5 space-y-3">
          <label className="text-xs text-slate-400">
            Title
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={state.title}
              onChange={(e) =>
                setState((s) => ({ ...s, title: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <label className="text-xs text-slate-400">
            Type
            <select
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={state.type}
              onChange={(e) =>
                setState((s) => ({ ...s, type: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            >
              <option>banner</option>
              <option>maintenance</option>
            </select>
          </label>
          <label className="text-xs text-slate-400">
            Content (HTML/text)
            <textarea
              rows={6}
              className="mt-1 w-full rounded border bg-transparent p-2 text-sm"
              value={state.content}
              onChange={(e) =>
                setState((s) => ({ ...s, content: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            />
          </label>

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Target Segments</h3>
            <div className="grid grid-cols-2 gap-2">
              {segments.map((s) => (
                <label
                  key={s.id}
                  className="text-xs text-slate-300 rounded border p-2"
                  style={{
                    borderColor: "rgba(110,86,207,0.25)",
                    background: "#0F1118",
                  }}
                >
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={!!state.segments?.includes(s.id)}
                    onChange={() => toggleSegment(s.id)}
                  />
                  {s.name}{" "}
                  <span className="text-slate-500">
                    ({s.sizeEstimate.toLocaleString()})
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-xs text-slate-400">
                Start
                <input
                  type="datetime-local"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={sched.start}
                  onChange={(e) =>
                    setSched((s) => ({ ...s, start: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
              </label>
              <label className="text-xs text-slate-400">
                End
                <input
                  type="datetime-local"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={sched.end}
                  onChange={(e) =>
                    setSched((s) => ({ ...s, end: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
              </label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="h-8 px-3 rounded-lg border text-sm"
                onClick={() => onSave({ ...state })}
                style={{ borderColor: COLORS.ring }}
              >
                Save
              </button>
              <button
                className="h-8 px-3 rounded-lg border text-sm"
                onClick={() =>
                  onSchedule(
                    state.id,
                    new Date(sched.start).toISOString(),
                    new Date(sched.end).toISOString(),
                    state.segments || []
                  )
                }
                style={{ borderColor: COLORS.ring }}
              >
                Schedule
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
