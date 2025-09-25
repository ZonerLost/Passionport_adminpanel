import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">404 — Not Found</h1>
        <p className="text-[#A3A7B7]">The page you requested does not exist.</p>
        <Link to="/" className="underline text-white/90">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
}
