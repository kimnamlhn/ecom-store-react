import Login from './pages/login';
import Register from './pages/register';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
function App() {
  return (
    <div>
      <div className="container mt-3">
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
