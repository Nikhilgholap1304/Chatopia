import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import checkInterConnection from "./utils/checkInternetConnection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ToastCont from "./components/ToastCont";
import LoadCont from "./pages/LoadCont";
import { useUserStore } from "./lib/userStore";

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
  const { isLoading } = useUserStore();
  return (
    <Router>
      <AuthContextProvider>
        {!isLoading ? (
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
            <Route path="/" element={<AuthRedirect />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          isLoading && <LoadCont />
        )}

        {checkInterConnection()}
        <ToastCont />
      </AuthContextProvider>
    </Router>
  );
};

export default App;
