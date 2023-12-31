import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Company from "./pages/company/company";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
