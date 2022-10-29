import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
