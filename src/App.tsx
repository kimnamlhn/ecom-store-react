import Login from './components/LoginBox';
import Register from './pages/register';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import Product from './pages/products/Product';
import ProfileCard from './components/ProfileCard';
import { UserProvider } from './contexts/UserContext';
function App() {
  return (
    <div>
      <div className="container mt-3">
        <UserProvider >
          <BrowserRouter>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/products" element={<Product />} />
              <Route path="/profile" element={<ProfileCard />} />

            </Routes>
          </BrowserRouter>
        </UserProvider>

      </div>

    </div>
  );
}

export default App;
