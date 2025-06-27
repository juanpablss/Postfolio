import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Competition from "./pages/Competition";
import UserProfile from "./pages/UserProfile";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/competicao" element={<Competition />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}
