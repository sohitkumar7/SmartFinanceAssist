import React from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import Header from './Header.jsx';

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // wait until Clerk finishes loading
  if (!isSignedIn) return null; // optionally hide header if not logged in

  return (
    <div>

      <Header></Header>
      
    </div>

    
  );
}

export default Dashboard;