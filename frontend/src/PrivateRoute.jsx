import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Home from './components/Header';

export default function PrivateRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Home/>
      </SignedOut>
    </>
  );
}