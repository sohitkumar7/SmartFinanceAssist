import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="sticky  top-0  w-full flex justify-between border-b-2 border-blue-500 ">
        <img onClick={() => navigate("/")}  className="h-12" src={logo} alt="" />
        <Button
          onClick={() => navigate("/signup")}
          className="m-2 mr-5 bg-white text-black hover:bg-black hover:text-white"
        >
          Signup
        </Button>
      </nav>

      <div className=" min-h-screen bg-gray-50 flex items-center justify-center">
        <SignIn
          routing="path"
          path="/login"
          afterSignInUrl="/dashboard"
        ></SignIn>
      </div>
    </>
  );
}

export default LoginPage;
