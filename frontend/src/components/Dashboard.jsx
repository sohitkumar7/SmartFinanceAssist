import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import Dashboardpage from "../pages/Dashboard/dashboardpage.jsx";
import { BarLoader } from "react-spinners";
import { fetchallAccount } from "../Store/Account-Slice/index.js";
import { Loader2 } from "lucide-react";

import { useAuthenticatedAxios } from "../hoook/useAuthenticated.js";
import { setUser } from "@/Store/Auth-Slice";

function Dashboard() {
  const { isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const api = useAuthenticatedAxios();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Login or Make Account First");
      navigate("/login");
      return;
    }

    if (isLoaded && isSignedIn && !isAuthenticated) {
      const loadUser = async () => {
        try {
          const res = await api.get("/api/user/me");
          dispatch(setUser(res.data.user));
          dispatch(fetchallAccount());
        } catch (error) {
          toast.error("Failed to authenticate with backend");
        }
      };

      loadUser();
    }
  }, [isLoaded, isSignedIn, isAuthenticated]);

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
