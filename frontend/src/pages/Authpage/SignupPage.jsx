import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SignUp } from "@clerk/clerk-react";

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen outer-overflow ">
      <nav className="sticky  top-0  w-full flex justify-between border-b-2 border-blue-500 ">
        <img onClick={() => navigate("/")} className="h-12" src={logo} alt="" />
        <Button
          onClick={() => navigate("/login")}
          className="m-2 mr-5 bg-white text-black hover:bg-black hover:text-white"
        >
          Login
        </Button>
      </nav>

      <form className=" mt-70 flex flex-col justify-center items-center border-2  border-black  rounded  ml-[43%] h- w-60">
        
        <div className="mb-4 border-2">
          <label className="block text-sm font-medium mb-1"> UserName</label>
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" > email</label>
          <input
            type="email"
            placeholder="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="p-2"> password </label>
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="p-2"> Confirm Password </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button> Register </Button>
      </form>
    </div>
  );
}

export default SignupPage;
