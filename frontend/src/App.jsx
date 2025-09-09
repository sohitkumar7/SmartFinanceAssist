import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import PrivateRoute from './PrivateRoute';
import Transaction from './components/Transaction.jsx';
import Account from './components/Account.jsx';
import LoginPage from './pages/Authpage/LoginPage.jsx';
import SignupPage from './pages/Authpage/SignupPage.jsx';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      } />
      <Route path="/account" element={
        <PrivateRoute>
          <Account/>
        </PrivateRoute>
      } />
      <Route path="/transaction" element={
        <PrivateRoute>
          <Transaction/>
        </PrivateRoute>
      } />

    </Routes>
     <Toaster/>
    </BrowserRouter>
  );
}

export default App;
