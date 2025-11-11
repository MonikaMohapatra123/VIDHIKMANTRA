import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DynamicForm from '../../components/DynamicData/DynamicForm';
const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';


const schema = [
{ name:'page', label:'Page', type:'text' },
{ name:'title', label:'Title', type:'text', required:true },
{ name:'category', label:'Category', type:'text', required:true },
{ name:'thumbnail', label:'Thumbnail URL', type:'text' },
{ name:'content', label:'Content', type:'textarea', rows:8, required:true },
{ name:'author', label:'Author', type:'text' }
];


export default function EditBlog(){
const { id } = useParams();
const nav = useNavigate();
const [values, setValues] = useState({});
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);


useEffect(()=>{ fetch(); }, []);
async function fetch(){ try{ const r=await axios.get(`${BACKEND}/api/blogs/${id}`); setValues(r.data||{}); }catch(e){ alert('Load failed'); } finally{ setLoading(false); } }
function onChange(k,v){ setValues(prev=>({ ...prev, [k]: v })); }


async function handleSave(){ if(!values.title || !values.content) return alert('Title and content required'); setSaving(true); try{ await axios.put(`${BACKEND}/api/blogs/${id}`, values); nav('/admin/blogs'); }catch(e){ alert('Save failed'); } finally{ setSaving(false); } }


if(loading) return <div className="muted">Loading...</div>;
return (
<div>
<div className="list-top"><h3>Edit Blog</h3></div>
<DynamicForm schema={schema} values={values} onChange={onChange} gridCols={1}>
<div className="form-actions">
<button className="btn primary" onClick={handleSave} disabled={saving}>{saving? 'Saving...':'Save'}</button>
</div>
</DynamicForm>
</div>
);
}