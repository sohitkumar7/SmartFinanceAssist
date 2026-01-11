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
            dispatch(fetchallAccount({ UserId: data.payload.user._id }));
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
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-indigo-600 font-medium text-sm sm:text-base">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <h1
          className="
            text-3xl sm:text-4xl lg:text-5xl font-bold
            leading-tight tracking-tighter
            text-transparent bg-clip-text
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
          "
        >
          DashBoard
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 pb-8">
        <Suspense fallback={<BarLoader width="100%" color="#6366f1" />}>
          <Dashboardpage />
        </Suspense>
      </div>
    </div>
  );
}

export default Dashboard;
