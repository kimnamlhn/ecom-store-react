import Login from './pages/login';
import Register from './pages/register';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
function App() {
  return (
    <div>
      <div className="container mt-3">
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
