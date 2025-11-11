import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Admin.css';


export default function AdminLayout(){
const loc = useLocation();
return (
<div className="admin-wrap">
<aside className="admin-side">
<div className="brand">VIDHIKMANTRA</div>
<nav>
<ul>
<li className={loc.pathname.includes('/admin/blogs')? 'active':''}><Link to="/admin/blogs">Admin Blogs</Link></li>
<li className={loc.pathname.includes('/admin/casestudies')? 'active':''}><Link to="/admin/casestudies">Admin Case Studies</Link></li>
</ul>
</nav>
</aside>
<main className="admin-main">
<header className="admin-top">
<h2>Admin Panel</h2>
<div className="top-actions">
<a href="/" className="btn small">Go to site</a>
</div>
</header>


<section className="admin-content">
<Outlet />
</section>
</main>
</div>
);
}