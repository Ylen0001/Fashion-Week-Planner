import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx"
import { useNavigate } from 'react-router-dom'

function AuthPage({setCurrentUser}) {
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
          console.log("signup data:", data);
          console.log("signup ok:", res.ok);

          if(!res.ok){
            alert(data.error);
            return;
          } 
          
          alert("Account created successfully.");

          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setMode("login");
          setCurrentUser(data.user)

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

        // console.log(data);
        
        localStorage.setItem("token", data.token); // Enregistrement du token dans le localSto 
        setCurrentUser(data.user)
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