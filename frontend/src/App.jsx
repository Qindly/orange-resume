import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UserProvider from "./context/UserContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { User } from "lucide-react";
import { Toaster } from "react-hot-toast";
import EditResume from "./components/EditResume.jsx";
import MarkdownTestPage from "./components/MarkdownTestPage.jsx";
import ScrollTest from "./components/ScrollTest.jsx";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document/:documentId" element={<EditResume />} />
        <Route path="/markdown" element={<MarkdownTestPage />} />
        <Route path="/scroll-test" element={<ScrollTest />} />
      </Routes>

      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: "13px"
        }
      }}></Toaster>
    </UserProvider>
  );
};

export default App;
