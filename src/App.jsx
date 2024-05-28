import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
