import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import Transaction from './components/Transaction.jsx';
import Account from './components/Account.jsx';
import LoginPage from './pages/Authpage/LoginPage.jsx';
import SignupPage from './pages/Authpage/SignupPage.jsx';
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoaded, isSignedIn } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You would add other protected routes here similarly */}
        <Route path="/account" element={<Account />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;