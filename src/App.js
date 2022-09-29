import "./App.css";

import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Toaster } from "react-hot-toast";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { ErrorPage } from "./pages/ErrorPage";
import { ProtectedRoute } from "./components/ProtectRoute";
import UserPage from "./pages/UserPage";
import FollowersPage from "./pages/FolowersPage";
import FollowingPage from "./pages/FollowingPage";

function App() {
  return (
    <>
      <Toaster />

      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path="/users/:idUser"
            element={<ProtectedRoute Component={UserPage} />}
          />
          <Route
            path="/followers"
            element={<ProtectedRoute Component={FollowersPage} />}
          />
          <Route
            path="/following"
            element={<ProtectedRoute Component={FollowingPage} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
