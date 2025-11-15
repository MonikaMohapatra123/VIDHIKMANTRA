

// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// --- Website Pages ---
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogDetail from "./pages/BlogPage/BlogDetails";
import CaseDetail from "./pages/CaseStudiesPage/CaseDetail";
import CasePage from "./pages/CaseStudiesPage/CasePage";
// --- Admin Pages ---
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import BlogsList from "./pages/Admin/BlogsList";
import AddBlog from "./pages/Admin/AddBlog";
import EditBlog from "./pages/Admin/EditBlog";
import ViewBlog from "./pages/Admin/ViewBlog";
import CasesList from "./pages/Admin/CasesList";
import AddCase from "./pages/Admin/AddCase";
import EditCase from "./pages/Admin/EditCase";
import ViewCase from "./pages/Admin/ViewCase";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

import "./App.css";
import "./pages/Admin/Admin.css";
import Contact from "./components/Contact/Contact";
import ViewDailyNews from "./pages/Admin/ViewDailyNews";
import AddDailyNews from "./pages/Admin/AddDailyNews";
import EditDailyNews from "./pages/Admin/EditDailyNews";
import DailyNewsList from "./pages/Admin/DailyNewsList";
import DailyNewsPage from "./pages/DailyNews/DailyNewsPage";
import DailyNewsDetail from "./pages/DailyNews/DailyNewsDetail";


// ✅ Layout for public website (Navbar + Footer always visible)
function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public Website Routes ---------- */}
       <Route path="/" element={<WebsiteLayout><Home /></WebsiteLayout>} />
<Route path="/blogs" element={<WebsiteLayout><BlogPage /></WebsiteLayout>} />
<Route path="/blogs/:id" element={<WebsiteLayout><BlogDetail /></WebsiteLayout>} />
<Route path="/case-studies" element={<WebsiteLayout><CasePage /></WebsiteLayout>} />
<Route path="/casestudies/:id" element={<WebsiteLayout><CaseDetail /></WebsiteLayout>} />
<Route path="/dailynews" element={<WebsiteLayout><DailyNewsPage /></WebsiteLayout>} />
<Route path="/dailynews/:id" element={<WebsiteLayout><DailyNewsDetail /></WebsiteLayout>} />
<Route path="/contact" element={<WebsiteLayout><Contact /></WebsiteLayout>} />

       

        {/* ---------- Admin Login (no navbar/footer) ---------- */}
        <Route path="/admin/login" element={<Login />} />

        {/* ---------- Protected Admin Routes ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="blogs" element={<BlogsList />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blogs/:id" element={<ViewBlog />} />
          <Route path="blogs/:id/edit" element={<EditBlog />} />
          <Route path="casestudies" element={<CasesList />} />
          <Route path="casestudies/add" element={<AddCase />} />
          <Route path="casestudies/:id" element={<ViewCase />} />
          <Route path="casestudies/:id/edit" element={<EditCase />} />
          <Route path="/admin/dailynews" element={<DailyNewsList />} />
          <Route path="/admin/dailynews/add" element={<AddDailyNews />} />
          <Route path="/admin/dailynews/:id" element={<ViewDailyNews />} />
          <Route path="/admin/dailynews/:id/edit" element={<EditDailyNews />} />

        </Route>

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
