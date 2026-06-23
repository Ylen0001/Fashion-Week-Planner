import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx"
import { useNavigate } from 'react-router-dom'

function AuthPage({ setCurrentUser, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(mode === "signup"){
      if(!password || !username || !email || !confirmPassword){
        alert("Please fill all fields.");
        return;
      }

      if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
      }
      
      const account = {
        username,
        email,
        password
      };
      
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        headers: {
          "Content-Type" : "application/json"
        },
          method: "POST",
          body: JSON.stringify(account)});

          const data = await res.json();

          if(!res.ok){
            alert(data.error);
            return;
          } 
          
          alert("Account created successfully.");

          localStorage.setItem("token", data.token);
          setCurrentUser(data.user);

          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          await onAuthSuccess?.();
          navigate("/account");

        } catch (error) {
          console.error(error);
          alert("Network error. Please try again.");
      }
    } else if(mode === "login") {
      
      if(!email || !password){
        alert("Missing email or password")
        return;
      }

      const loginInfo = {
        email,
        password
      }

      try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(loginInfo)
        });

        const data = await res.json();

        if(!res.ok){
          alert(data.error)
          return;
        }

        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);

        await onAuthSuccess?.();
        alert("Login successful");
        navigate("/account");

      } catch(error){
        console.error(error);
        alert("Network error. Please try again.");
      }
    }
  }

  return (
    <AuthForm mode={mode} setMode={setMode}
    username={username} setUsername={setUsername}
    email={email} setEmail={setEmail}
    password={password} setPassword={setPassword}
    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
    handleSubmit={handleSubmit}></AuthForm>
  );
}

export default AuthPage;