import { useUser } from "@clerk/clerk-react";
import { fetchCurrentUser } from "../Store/Auth-Slice/index.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, backendUser } = useSelector((state) => state.auth);
  
  useEffect(() => {

    if (isLoaded && !isSignedIn) {
      toast.error("Login or Make Account First")
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
      {backendUser ? (
        <div className="flex items-center gap-4 p-4">
          <img
            src={user?.imageUrl}
            alt="User profile"
            className="w-12 h-12 rounded-full"
          />
          <div>Welcome {backendUser.name}</div>
        </div>
      ) : (
        <div>Fetching user details from backend...</div>
      )}
    </div>
  );
}

export default Dashboard;
