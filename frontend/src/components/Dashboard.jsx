import { useUser } from "@clerk/clerk-react";
import { fetchCurrentUser } from "../Store/Auth-Slice/index.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import Dashboardpage from "../pages/Dashboard/dashboardpage.jsx";
import {BarLoader} from "react-spinners"
function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, backendUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Login or Make Account First");
      navigate("/login");
      return;
    }

    if (isLoaded && isSignedIn && !isAuthenticated) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => {
          toast.error("Failed to authenticate with backend.");
        });
    }
  }, [isLoaded, isSignedIn, dispatch, navigate, isAuthenticated]);

  if (!isLoaded || !isAuthenticated) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-5xl font-bold 
            ml-2
             text-blue-500ext-5xl   
              leading-tight tracking-tighter
              text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-5">DashBoard</h1>
      </div>

      <Suspense className="mt-4  w-[100%] color-#9333ea"  fallback={<BarLoader/>}>
        <Dashboardpage/>
      </Suspense>
    </div>
  );
}

export default Dashboard;
