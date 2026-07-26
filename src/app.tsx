import "./app.css";
import Home from "./pages/Home";
import "material-icons/iconfont/material-icons.css";
import Layout from "./components/layout";
import Admin from "./pages/Admin";
import LoginCancel from "./pages/LoginCancel";
import LoginSuccess from "./pages/LoginSuccess";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import VoteDetail from "./pages/VoteDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SelectProvider } from "./context";
import VoteResult from "./pages/VoteResult";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <SelectProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="vote/ongoing/:id" element={<VoteDetail />} />
                <Route path="vote/result/:id" element={<VoteResult />} />
              </Route>

              <Route path="/login/cancel" element={<LoginCancel />} />
              <Route path="/login/success" element={<LoginSuccess />} />
            </Routes>
          </SelectProvider>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
