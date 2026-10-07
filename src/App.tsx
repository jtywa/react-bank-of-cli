import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import data from "./data/db.json";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userLoggedIn ? <Dashboard /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
