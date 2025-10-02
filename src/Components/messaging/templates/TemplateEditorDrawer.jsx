import React, { useMemo, useState } from "react";
import { COLORS } from "../../ui/shared/theme";

const VARS = {
  follow: ["user_name"],
  like: ["user_name"],
  backer_thank_you: ["user_name", "campaign_name"],
  order_update: ["user_name", "order_id", "status"],
  live_stream: ["user_name", "brand_name", "start_time"],
};

export default function TemplateEditorDrawer({
  open,
  template,
  onClose,
  onSave,
  onRollback,
  onTest,
}) {
  const [state, setState] = useState(template || null);
  const vars = useMemo(
    () => VARS[state?.event || "follow"] || [],
    [state?.event]
  );

  React.useEffect(() => setState(template || null), [template]);
  if (!open || !state) return null;

  const addVariant = () =>
    setState((s) => ({
      ...s,
      versions: [
        ...s.versions.slice(0, -1),
        {
          ...s.versions.at(-1),
          variants: [
            ...s.versions.at(-1).variants,
            {
              id: `var_${Date.now()}`,
              name: `V${s.versions.at(-1).variants.length + 1}`,
              subject: "",
              body: "",
              enabled: true,
            },
          ],
        },
      ],
    }));
  const setVariant = (id, patch) =>
    setState((s) => ({
      ...s,
      versions: [
        ...s.versions.slice(0, -1),
        {
          ...s.versions.at(-1),
          variants: s.versions
            .at(-1)
            .variants.map((v) => (v.id === id ? { ...v, ...patch } : v)),
        },
      ],
    }));

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto border-l shadow-md shadow-[#ff7a00]"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">Edit Template</div>
          <div className="text-sm text-slate-300">
            {state.id} • v{state.currentVersion}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Name">
              <input
                className="mt-1 h-8 w-full text-white rounded border bg-transparent px-2 text-sm"
                value={state.name}
                onChange={(e) =>
                  setState((s) => ({ ...s, name: e.target.value }))
                }
                style={{ borderColor: COLORS.ring }}
              />
            </Field>
            <Field label="Event">
              <select
                className="mt-1 h-8 w-full text-white rounded border bg-transparent px-2 text-sm"
                value={state.event}
                onChange={(e) =>
                  setState((s) => ({ ...s, event: e.target.value }))
                }
                style={{ borderColor: COLORS.ring }}
              >
                <option value="follow">follow</option>
                <option value="like">like</option>
                <option value="backer_thank_you">backer_thank_you</option>
                <option value="order_update">order_update</option>
                <option value="live_stream">live_stream</option>
              </select>
            </Field>
            <Field label="Category">
              <select
                className="mt-1 h-8 w-full text-white rounded border bg-transparent px-2 text-sm"
                value={state.category}
                onChange={(e) =>
                  setState((s) => ({ ...s, category: e.target.value }))
                }
                style={{ borderColor: COLORS.ring }}
              >
                <option value="general">general</option>
                <option value="loyalty">loyalty</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["push", "email", "inapp"].map((ch) => (
              <Field key={ch} label={`Channel: ${ch}`}>
                <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={!!state.channels[ch]}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        channels: { ...s.channels, [ch]: e.target.checked },
                      }))
                    }
                  />{" "}
                  Enabled
                </label>
              </Field>
            ))}
            <Field label="Throttle/user/hr">
              <input
                type="number"
                className="mt-1 h-8 w-full text-white rounded border bg-transparent px-2 text-sm"
                value={state.throttlePerUserPerHr}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    throttlePerUserPerHr: Number(e.target.value),
                  }))
                }
                style={{ borderColor: COLORS.ring }}
              />
            </Field>
          </div>

          {/* Variables helper */}
          <section>
            <h3 className="text-slate-200 font-medium mb-2">
              Available variables
            </h3>
            <div className="flex flex-wrap gap-2">
              {vars.map((v) => (
                <code
                  key={v}
                  className="px-2 py-1 rounded border text-xs"
                  style={{
                    borderColor: COLORS.ring,
                    background: "#0F1118",
                    color: "#D4AF37",
                  }}
                >{`{{${v}}}`}</code>
              ))}
            </div>
          </section>

          {/* Variants */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-200 font-medium">A/B Variants</h3>
              <button
                className="h-8 px-3 rounded-lg border text-white text-sm"
                onClick={addVariant}
                style={{ borderColor: COLORS.ring }}
              >
                Add Variant
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {state.versions.at(-1).variants.map((v) => (
                <div
                  key={v.id}
                  className="rounded-lg text-white border p-3"
                  style={{
                    borderColor: "rgba(255,122,0,0.25)",
                    background: "#0F1118",
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                    <div className="md:col-span-1">
                      <label className="text-xs text-slate-400">Name</label>
                      <input
                        className="mt-1 h-8 w-full rounded text-white border bg-transparent px-2 text-sm"
                        value={v.name}
                        onChange={(e) =>
                          setVariant(v.id, { name: e.target.value })
                        }
                        style={{ borderColor: COLORS.ring }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs text-slate-400">
                        Subject (email)
                      </label>
                      <input
                        className="mt-1 h-8 w-full rounded border text-white bg-transparent px-2 text-sm"
                        value={v.subject}
                        onChange={(e) =>
                          setVariant(v.id, { subject: e.target.value })
                        }
                        style={{ borderColor: COLORS.ring }}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-xs text-slate-400">Body</label>
                      <textarea
                        rows={3}
                        className="mt-1 w-full rounded border text-white bg-transparent p-2 text-sm"
                        value={v.body}
                        onChange={(e) =>
                          setVariant(v.id, { body: e.target.value })
                        }
                        style={{ borderColor: COLORS.ring }}
                      />
                    </div>
                  </div>
                  <label className="text-xs text-slate-400 inline-flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={v.enabled}
                      onChange={(e) =>
                        setVariant(v.id, { enabled: e.target.checked })
                      }
                    />{" "}
                    Enabled
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap text-gray-400 items-center gap-2">
            <button
              className="h-9 px-3 rounded-lg text-white border text-sm"
              onClick={() => onSave({ ...state })}
              style={{ borderColor: COLORS.ring }}
            >
              Save (new version)
            </button>
            <button
              className="h-9 px-3 rounded-lg text-white border text-sm"
              onClick={() => {
                const version = Number(prompt("Rollback to version:", "1"));
                if (version) onRollback(state.id, version);
              }}
              style={{ borderColor: COLORS.ring }}
            >
              Rollback…
            </button>
            <button
              className="h-9 px-3 rounded-lg text-white border text-sm"
              onClick={() => {
                const channel = prompt("Channel (push/email/inapp):", "email");
                const target = prompt(
                  "Send test to (email/user id):",
                  "user@mail.test"
                );
                if (channel && target) onTest(state.id, channel, target);
              }}
              style={{ borderColor: COLORS.ring }}
            >
              Send Test…
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="text-xs text-slate-400">
      {label}
      {children}
    </label>
  );
}
