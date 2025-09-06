import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import banner from "../../assets/banner.jpg";
function Hero() {
  return (
    <div className="pb-20 px-4 mt-15">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 font-extrabold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Manage Your Finances <br />
          with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered finance management platform that helps you to track ,
          analyze, and optimizes your spending with real time insights.
        </p>
        <div className=" gap-2  mb-5 flex justify-center items-center ">
          <Link to={"/login"}>
            <Button size="lg" className="px-8 bg-white text-black border-black hover:bg-white hover:cursor-pointer">
              Get Started
            </Button>
          </Link>

          <Link to={"https://share.google/TpxxpYoDh2mJ6iwyu "}>
            <Button size="lg" className="px-8 hover:cursor-pointer">
              learn code
            </Button>
          </Link>
        </div>

        <div>
          <div>
            <img
              className="rounded-lg shadow-2xl border mx-auto"
              width={1280}
              height={720}
              src={banner}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
