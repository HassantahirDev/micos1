import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Chat from "./Chat";

import Library from "./Library";

import AssetLibrary from "./AssetLibrary";

import Login from "./Login";

import SignUp from "./SignUp";

import ForgotPassword from "./ForgotPassword";

import UpdatePassword from "./UpdatePassword";

import GoogleCallback from "./GoogleCallback";

function isValidJWT(token) {
  try {
    const decoded = jwtDecode(token); // Changed from jwt_decode to jwtDecode
    // Check for exp (expiration) in seconds
    if (!decoded.exp) return false;
    const now = Date.now() / 1000; // current time in seconds
    return decoded.exp > now;
  } catch {
    return false;
  }
}

function ProtectedRoute({ children }) {
  let hasToken = false;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt_token");
    hasToken = token && isValidJWT(token);
  }
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PagesContent() {
  const location = useLocation();
  // Only render Layout for main app pages
  if (
    ["/", "/dashboard", "/chat", "/library", "/assetlibrary"].includes(
      location.pathname.toLowerCase()
    )
  ) {
    let currentPage =
      location.pathname.replace("/", "").toLowerCase() || "dashboard";
    return (
      <ProtectedRoute>
        <Layout currentPageName={currentPage}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/*" element={<Chat />} />
            <Route path="/library" element={<Library />} />
            <Route path="/assetlibrary" element={<AssetLibrary />} />
          </Routes>
        </Layout>
      </ProtectedRoute>
    );
  }
  // Auth and utility pages (no Layout)
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/updatepassword" element={<UpdatePassword />} />
      <Route path="/google-callback" element={<GoogleCallback />} />
    </Routes>
  );
}

export default function AppPages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
