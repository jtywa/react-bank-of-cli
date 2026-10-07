import "./App.css";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transaction/Transaction";
import Recent from "./pages/Recent/Recent";
import Settings from "./pages/Settings/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <BrowserRouter>
        <nav></nav>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />}></Route>
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />}></Route>
          <Route path="/transaction" element={isLoggedIn ? <Transaction /> : <Login />}></Route>
          <Route path="/recent" element={isLoggedIn ? <Recent /> : <Login />}></Route>
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
