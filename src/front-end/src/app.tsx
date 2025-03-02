import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"

export function App() {
  return (
    <div className="bg-pattern bg-auto bg-top min-h-screen w-full text-light-white">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
