import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { LayoutDashboard, PenBox } from "lucide-react";

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="sticky top-0 w-full flex justify-between border-b-2 border-blue-500 ">
        <img onClick={() => navigate("/")} className="h-12" src={logo} alt="" />

        <div className="flex justify-center items-center gap-2 p-1">
          <SignedIn>
            <Button
              onClick={() => navigate("/transaction")}
              className="bg-white text-black hover:bg-white"
            >
              <PenBox size={18} />
              <span className="hidden md:inline">Add Transcation</span>
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-black hover:bg-white"
            >
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">dashboard</span>
            </Button>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Button
              onClick={() => navigate("/login")}
              className="m-2 border-2 bg-white text-black hover:bg-black hover:text-white"
            >
              Login
            </Button>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
}

export default Header;
