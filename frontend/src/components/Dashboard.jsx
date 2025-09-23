import { useUser, useAuth } from "@clerk/clerk-react";
import { fetchCurrentUser } from "../Store/Auth-Slice/index.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Header.jsx";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const { isAuthenticated, backendUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

    useEffect(() => {
    // Redirect unauthenticated users to the login page
    if (isLoaded && !isSignedIn) {
      toast.error("Login or Make Account First")
      navigate("/login");
    }

    // Fetch user data from the backend only if Clerk is ready and the user is signed in
    if (isLoaded && isSignedIn) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => {
          toast.error("Failed to authenticate with backend.");
        });
    }
  }, [isLoaded, isSignedIn, dispatch, navigate]);

  // This useEffect handles the toast notification for successful login.
  // It only runs when the backendUser state becomes populated.
  useEffect(() => {
    if (backendUser && isAuthenticated) {
      toast.success("User Login Successfully");
    }
  }, [backendUser, isAuthenticated]);

  if (!isLoaded || !isAuthenticated) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <Header></Header>
          
    </div>
  );
}

export default Dashboard;
