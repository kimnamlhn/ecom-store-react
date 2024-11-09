import Login from './pages/login';
import Register from './pages/register';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import Product from './pages/products/Product';

function App() {
  return (
    <div>
      <div className="container mt-3">
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/products" element={<Product />} />
            </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
