import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Linkpage from "./components/pages/Linkpage";
import Home from "./components/pages/Home";
import Editor from "./components/pages/Editor";
import Admin from "./components/pages/Admin";
import Loudge from "./components/pages/Loudge";
import RequiredAuth from "./components/pages/RequiredAuth";
function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* Public Layout Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/linkpage" element={<Linkpage />} />

          {/* Protected Layout routes */}
          <Route element={<RequiredAuth allowedRoles={[2001]} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[1984]} />}>
            <Route path="/editor" element={<Editor />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[5150]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[1984, 5150]} />}>
            <Route path="/loudge" element={<Loudge />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
