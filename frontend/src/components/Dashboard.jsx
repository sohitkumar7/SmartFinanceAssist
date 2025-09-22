import { useUser, useAuth } from "@clerk/clerk-react";
import { fetchCurrentUser } from "../Store/Auth-Slice/index.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Header.jsx";
import { useSelector

 } from "react-redux";
function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const { isAuthenticated, backendUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch the user if Clerk has loaded and the user is signed in.
    if (isLoaded && isSignedIn) {
      dispatch(fetchCurrentUser())
        .unwrap() // Use unwrap() to handle the promise for toast messages
        .then((data) => {
          if (data?.success) {
            toast.success("User Login Successfully");
          } else {
            toast.error(data?.message || "User not found in database.");
          }
        })
        .catch(() => {
          user = null;
          toast.error("Failed to authenticate with backend.");
        });
    }
  }, [isLoaded, isSignedIn, dispatch]);

  if (!isLoaded) {
    return <div>Loading user...</div>;
  }

  if (!isSignedIn) {
    // This should ideally be handled by a router redirect, but as a fallback:
    return <div>Please sign in to view the dashboard.</div>;
  }

  return (
    <div>
      <Header></Header>
      Welcome {user?.firstName}
    </div>
  );
}

export default Dashboard;
