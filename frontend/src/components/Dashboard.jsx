import { useUser } from "@clerk/clerk-react";
import { fetchCurrentUser } from "../Store/Auth-Slice/index.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import Dashboardpage from "../pages/Dashboard/dashboardpage.jsx";
import { BarLoader } from "react-spinners";
import { fetchallAccount } from "../Store/Account-Slice/index.js";
import { Loader2 } from "lucide-react";

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, backendUser } = useSelector((state) => state.auth);

  const { allAccount } = useSelector((state) => state.Account);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Login or Make Account First");
      navigate("/login");
      return;
    }

    if (isLoaded && isSignedIn && !isAuthenticated) {
      dispatch(fetchCurrentUser())
        .then((data) => {
          if (data?.payload?.success) {
            // console.log(data.payload.user);
            dispatch(fetchallAccount({ UserId: data.payload.user._id })).then(
              (data) => {
                if (data?.payload?.success) {
                  // console.log(data);
                } else {
                  toast.error("Failed to load Accounts");
                }
              }
            );
          } else {
            toast.error("failed to authenticate with backend");
          }
        })
        .catch(() => {
          toast.error("Failed to authenticate with backend.");
        });
    }
  }, [isLoaded, isSignedIn, dispatch, navigate, isAuthenticated]);

  if (!isLoaded || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-indigo-600 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <h1
          className="text-5xl font-bold 
            ml-2
             text-blue-500ext-5xl   
              leading-tight tracking-tighter
              text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-5"
        >
          DashBoard
        </h1>
      </div>

      <Suspense
        className="mt-4  w-[100%] color-#9333ea"
        fallback={<BarLoader />}
      >
        <Dashboardpage />
      </Suspense>
    </div>
  );
}

export default Dashboard;
