import React from "react";

export default function Avatar({ name = "", src, size = 28 }) {
  const initials =
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  return (
    <div
      className="inline-flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "#0F1118",
        border: "1px solid rgba(255,122,0,0.25)",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-xs text-slate-300">{initials}</span>
      )}
    </div>
  );
}
