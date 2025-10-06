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
import NotFoundPage from './pages/notFound/index.jsx';

function App() {
  const { isLoaded, isSignedIn } = useUser();
  const { isAuthenticated, backendUser } = useSelector((state) => state.auth);

  // console.log(backendUser);
  // console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login/*" element={<LoginPage/>} />
        <Route path="/signup/*" element={<SignupPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You would add other protected routes here similarly */}
        <Route path="/account" element={<Account />} />
        <Route path="/transaction" element={<Transaction />} />

        <Route path="*" element={<NotFoundPage/>}>
          {" "}
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;



