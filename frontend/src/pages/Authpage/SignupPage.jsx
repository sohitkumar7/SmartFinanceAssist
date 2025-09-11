import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SignUp } from "@clerk/clerk-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");


   const submitHandler = async(e) => {

    e.preventDefault();


    console.log(username)
    console.log(email)
    console.log(password)
    console.log(ConfirmPassword)

    // if(password !== ConfirmPassword){
    //   toast.error("password and confirmpassword donnot match")
    // }
    // else{

    //   const userinfo = {
    //     name:username,
    //     password:password,
    //     email:email,
    //     confirmpassword:ConfirmPassword
    //   }
      
    //   await axios
    //     .post("api/user/register",userinfo)
    //     .then((response) => {
    //       if(response.data){
    //         toast.success("Register Successfully");
    //       }
    //       localStorage.setItem("spotify",JSON.stringify(response.data))
    //       setAuthUser(response.data);
    //       // ther we have to set current user which is logged in
    //     })
    //     .catch((error) => {
    //       if(error.response){
    //         console.log(error);
    //         toast.error("Error : "+error.response.data.message)
    //       }
    //     })
    
    // }
  };

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

      <div className="flex mt-30  items-center justify-center">
        <Card onSubmit={submitHandler} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>
              Enter your Details to signUp in Welth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form  onSubmit={submitHandler}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="text">Username</Label>
                  <Input
                    type="text"
                    placeholder="UserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">ConfirmPassword</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              SignUp
            </Button>
          </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignupPage;
