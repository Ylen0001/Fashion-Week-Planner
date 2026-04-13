import { useState } from "react";

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="auth-page">
      <h1 className="page-title">
        {mode === "login" ? "Log in" : "Sign up"}
      </h1>

      <div className="auth-switch">
        <button
          type="button"
          className={`auth-switch__button ${mode === "login" ? "is-active" : ""}`}
          onClick={() => setMode("login")}
        >
          Log in
        </button>

        <button
          type="button"
          className={`auth-switch__button ${mode === "signup" ? "is-active" : ""}`}
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <form className="card auth-form">
        {mode === "signup" && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="fwplanner@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {mode === "signup" && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="**********"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <button className="button" type="submit">
          {mode === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;