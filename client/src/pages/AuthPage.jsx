import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx"

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  }

  return (
    <AuthForm mode={mode} setMode={setMode}
    username={username} setUsername={setUsername}
    email={email} setEmail={setEmail}
    password={password} setPassword={setPassword}
    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}></AuthForm>
  );
}

export default AuthPage;