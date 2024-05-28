import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const AuthRedirect = () => {
  const { currentUid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUid) {
      navigate(`/${currentUid}`);
    } else {
      navigate("/login");
    }
  }, [currentUid, navigate]);

  return null;
};

const PrivateRoute = ({ children }) => {
  const { currentUid } = useAuth();
  return currentUid ? children : <AuthRedirect />;
};

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/:uid"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<AuthRedirect/>} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
