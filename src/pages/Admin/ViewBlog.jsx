import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';


export default function ViewBlog(){
const { id } = useParams();
const [blog, setBlog] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(()=>{ fetch(); }, []);
async function fetch(){ try{ const r = await axios.get(`${BACKEND}/api/blogs/${id}`); setBlog(r.data); }catch(e){ alert('Load failed'); } finally{ setLoading(false); } }


if(loading) return <div className="muted">Loading...</div>;
if(!blog) return <div className="muted">Not found</div>;


return (
<div className="card-sm">
<h3>{blog.title}</h3>
<div className="meta">{blog.category} • {blog.author}</div>
{blog.thumbnail ? <img src={blog.thumbnail} className="thumb" alt="thumb" /> : null}
<div className="content" dangerouslySetInnerHTML={{ __html: blog.content }} />
<div style={{marginTop:12}}>
<Link to={`/admin/blogs/${id}/edit`} className="btn">Edit</Link>
</div>
</div>
);
}