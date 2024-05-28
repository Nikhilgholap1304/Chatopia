import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
