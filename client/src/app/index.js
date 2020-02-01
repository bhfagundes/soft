import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "../containers/Login";
import Login2 from "../components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Login2 />
    </Router>
  );
}

export default App;
