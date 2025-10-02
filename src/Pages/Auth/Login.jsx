import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate?.() || (() => {});
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const liveErrorRef = useRef(null);

  const validate = () => {
    if (!identifier.trim()) return "Please enter your username or email.";
    if (!password) return "Please enter your password.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) {
      setError(err);
      liveErrorRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      // Simulate async login (replace with real auth call)
      await new Promise((res) => setTimeout(res, 800));
      if (remember) localStorage.setItem("pp_remember", identifier);
      else localStorage.removeItem("pp_remember");
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        "Login failed. Please check your credentials and try again.",
        err
      );
      liveErrorRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gradient-to-br from-[#0E0F15] to-[#111214] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left / Branding */}
        <div
          className="hidden md:flex flex-col items-start justify-center gap-6 p-10 bg-[linear-gradient(180deg,rgba(255,122,0,0.06),transparent)]"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3">
            <div className="w-55 h-45 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-text-[#ff7a00] to-text-[#ff7a00] p-1">
              <img
                src="/assets/Logo.png"
                alt="Passion Port Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="text-[#C6C8D6]">
            <h3 className="text-lg font-medium mb-2">Welcome back</h3>
            <p className="text-sm leading-relaxed">
              Sign in to continue to your dashboard. Secure, fast, and easy to
              use.
            </p>
          </div>

          <div className="mt-4 text-xs text-[#7E8294]">
            Need an account?{" "}
            <span className="text-[#ff7a00]">Contact your admin</span>
          </div>
        </div>

        {/* Right / Form */}
        <div className="p-8 md:p-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-1">
              Sign in to your account
            </h1>
            <p className="text-sm text-[#A3A7B7] mb-6">
              Use your email or username and password to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-[#C6C8D6]"
                >
                  Username or email
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-2 block w-full rounded-lg bg-[#0F1014] border border-transparent focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/40 text-white placeholder:text-[#6B6F80] px-4 py-3 outline-none transition"
                  placeholder="you@company.com or username"
                  aria-label="Username or email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#C6C8D6]"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg bg-[#0F1014] border border-transparent focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/40 text-white placeholder:text-[#6B6F80] px-4 py-3 pr-12 outline-none transition"
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-sm text-[#9DA1B5] hover:text-white focus:outline-none"
                    aria-pressed={showPwd}
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {/* Eye icons unchanged */}
                    {showPwd ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-5.625M6.5 6.5L17.5 17.5"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-600 bg-[#0F1014] focus:ring-2 focus:ring-[#ff7a00]/40"
                  />
                  <span className="text-sm text-[#C6C8D6]">Remember me</span>
                </label>

                <div className="text-sm">
                  <a
                    href="/auth/forgot"
                    className="text-[#ff7a00] hover:text-[#ff9944]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {error && (
                <div
                  tabIndex={-1}
                  ref={liveErrorRef}
                  role="alert"
                  aria-live="assertive"
                  className="rounded-md bg-[#2B1F3D] border border-[#ff7a00]/30 px-4 py-2 text-sm text-[#ffb366]"
                >
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-gradient-to-r from-[#ff7a00] to-[#ff944d] text-white font-semibold shadow hover:scale-[1.01] transform transition disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>

              <p className="text-center text-sm text-[#8E92A6]">
                Don't have an account?{" "}
                <a
                  href="/auth/signup"
                  className="text-[#ff7a00] hover:text-[#ff9944] font-medium"
                >
                  Sign up
                </a>
              </p>
            </form>

            <div className="mt-6 border-t border-[#22232A] pt-4 text-xs text-[#6F7385]">
              By signing in you agree to our{" "}
              <a className="text-[#ff7a00]" href="/terms">
                Terms
              </a>{" "}
              and{" "}
              <a className="text-[#ff7a00]" href="/privacy">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
