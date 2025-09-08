import { useUser, useAuth } from '@clerk/clerk-react';
import Header from './Header.jsx';
import { useEffect } from 'react';

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // wait until Clerk finishes loading
  if (!isSignedIn) return null; // optionally hide header if not logged in

  const { getToken } = useAuth();

  useEffect(() => {
    const saveUser = async () => {
      if (user) {
        const token = await getToken();

        await axios.post("http://localhost:5000/api/Users/register",
          {
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    };

    saveUser();
  }, [user]);

  return (
    <div>

      <Header></Header>
      <h1>Welcome {user?.firstName}</h1>;
      
    </div>

    
  );
}

export default Dashboard;