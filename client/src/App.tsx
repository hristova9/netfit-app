import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Chats from "./pages/Chats";
// import PublicRoute from "../../../../project-demo/files/PublicRoute/PublicRoute";
// import { AuthProvider } from "../../../../project-demo/files/authContext";

function App() {
  return (
    <Router>
      <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/people"
            element={
              <MainLayout>
                <People />
              </MainLayout>
            }
          />
          <Route
            path="/chats"
            element={
              <MainLayout>
                <Chats />
              </MainLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
