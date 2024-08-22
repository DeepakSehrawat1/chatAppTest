import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";

import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ProtactedRoute from "./ProtactedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtactedRoute>
              <Dashboard />
            </ProtactedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
