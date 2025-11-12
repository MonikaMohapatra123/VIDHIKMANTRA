// // src/App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// // --- Website Pages ---
// import Navbar from './pages/Navbar/Navbar';
// import Home from './pages/Home/Home';
// // import About from './pages/About/About';
// // import BlogsPage from './pages/Blogs/Blogs';
// // import Contact from './pages/Contact/Contact';
// import Footer from './pages/Footer/Footer';

// // --- Admin Pages ---
// import AdminLayout from './pages/Admin/AdminLayout';
// import BlogsList from './pages/Admin/BlogsList';
// import AddBlog from './pages/Admin/AddBlog';
// import EditBlog from './pages/Admin/EditBlog';
// import ViewBlog from './pages/Admin/ViewBlog';
// import CasesList from './pages/Admin/CasesList';
// import AddCase from './pages/Admin/AddCase';
// import EditCase from './pages/Admin/EditCase';
// import ViewCase from './pages/Admin/ViewCase';

// import './App.css';
// import './pages/Admin/Admin.css';
// import BlogPage from './pages/BlogPage/BlogPage';
// import BlogDetail from './pages/BlogPage/BlogDetails';
// import CaseList from './pages/CaseStudiesPage/CaseList';
// import CaseDetail from './pages/CaseStudiesPage/CaseDetail';

// function WebsiteLayout() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Website (Navbar + Footer) */}
//         <Route element={<WebsiteLayout />}>
//           <Route path="/" element={<Home />} />
//            <Route path="/blogs" element={<BlogPage/>} />
//             <Route path="blogs/:id" element={<BlogDetail/>} />
//             <Route path="/case-studies" element={<CaseList />} />
//             <Route path="/casestudies/:id" element={<CaseDetail />} />

        
//         </Route>

//         {/* Admin (separate layout) */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="blogs" replace />} />
//           <Route path="blogs" element={<BlogsList />} />
//           <Route path="blogs/add" element={<AddBlog />} />
//           <Route path="blogs/:id" element={<ViewBlog/>} />
//           <Route path="blogs/:id/edit" element={<EditBlog />} />
//           <Route path="casestudies" element={<CasesList />} />
//           <Route path="casestudies/add" element={<AddCase />} />
//           <Route path="casestudies/:id" element={<ViewCase />} />
//           <Route path="casestudies/:id/edit" element={<EditCase />} />
//           <Route path="*" element={<div style={{ padding: 20 }}>Admin page not found</div>} />
//         </Route>

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }








// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// --- Website Pages ---
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";

// --- Admin Pages ---
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome"; // ✅ new
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

import BlogPage from "./pages/BlogPage/BlogPage";
import BlogDetail from "./pages/BlogPage/BlogDetails";
import CaseList from "./pages/CaseStudiesPage/CaseList";
import CaseDetail from "./pages/CaseStudiesPage/CaseDetail";

function WebsiteLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website Layout */}
        <Route path="/" element={<WebsiteLayout />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/case-studies" element={<CaseList />} />
        <Route path="/casestudies/:id" element={<CaseDetail />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Section */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} /> {/* ✅ New Dashboard Page */}
          <Route path="blogs" element={<BlogsList />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blogs/:id" element={<ViewBlog />} />
          <Route path="blogs/:id/edit" element={<EditBlog />} />
          <Route path="casestudies" element={<CasesList />} />
          <Route path="casestudies/add" element={<AddCase />} />
          <Route path="casestudies/:id" element={<ViewCase />} />
          <Route path="casestudies/:id/edit" element={<EditCase />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
