import { useUser, useAuth } from "@clerk/clerk-react";
import Header from "./Header.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Store/Auth-Slice/index.js";
import toast from "react-hot-toast";

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // wait until Clerk finishes loading
  if (!isSignedIn) return null; // optionally hide header if not logged in

  const formData = {
    email: user.email,
    name: user.firstName,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerUser(formData).then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          //  window.location.href = "/shop/home";
        } else {
          // console.log(data);
          toast.error(data?.payload?.message);
          
        }
      })
    );
  }, [user]);

  return (
    <div>
      <Header></Header>
      <h1>Welcome {user?.firstName}</h1>;
    </div>
  );
}

export default Dashboard;