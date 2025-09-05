import React from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // wait until Clerk finishes loading
  if (!isSignedIn) return null; // optionally hide header if not logged in

  return (
    <div>
      <p>Welcome, {user.firstName}</p>
      <SignOutButton>
        <button className="text-black bg-gray-200 px-4 py-2 rounded">
          Logout
        </button>
      </SignOutButton>
    </div>

    
  );
}

export default Dashboard;