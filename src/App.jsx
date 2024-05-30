import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import checkInterConnection from "./utils/checkInternetConnection";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";

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
          <Route path="/" element={<AuthRedirect />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {checkInterConnection()}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
          stacked
        />
      </AuthContextProvider>
    </Router>
  );
};

export default App;
