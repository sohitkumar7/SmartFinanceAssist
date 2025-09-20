import { useUser, useAuth } from "@clerk/clerk-react";
import {loginuser} from "../Store/Auth-Slice/index.js"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Header.jsx"
function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth(); // ✅ needed for Clerk token
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      (async () => {
        const token = await getToken(); // 🔑 get Clerk JWT

        dispatch(loginuser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.firstName,
          token, 
        })).unwrap()  
        .then((data) => {
          
          if(data?.payload?.success){
            // backendUSer = data.payload.user;
            toast.success(data?.payload?.message);
          }
          else{
            toast.error(data?.payload?.message);
          }
          
        })
      })();
    }
  }, [user, dispatch, getToken]);

  return <div>
    <Header></Header>
    Welcome {user?.firstName}
  </div>;
}


export default Dashboard;