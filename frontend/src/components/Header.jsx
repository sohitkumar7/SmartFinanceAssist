import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/clerk-react";

function Header() {

  const navigate = useNavigate();

  return (
    <div>
      <nav className="sticky  top-0  w-full flex justify-between border-b-2 border-blue-500 ">
        <img onClick={()=>navigate("/")} className="h-12" src={logo} alt="" />

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">  
              <Button className="m-2 bg-white text-black hover:bg-black hover:text-white">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>

      </nav>
    </div>
  );
}

export default Header;
