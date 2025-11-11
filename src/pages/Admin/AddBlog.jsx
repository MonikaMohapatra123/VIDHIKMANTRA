import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DynamicForm from '../../components/DynamicData/DynamicForm';
const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';


const schema = [
{ name:'page', label:'Page', type:'text', placeholder:'blog', required:true },
{ name:'title', label:'Title', type:'text', required:true },
{ name:'category', label:'Category', type:'text', required:true },
{ name:'thumbnail', label:'Thumbnail URL', type:'text' },
{ name:'content', label:'Content', type:'textarea', rows:8, required:true },
{ name:'author', label:'Author', type:'text' }
];


export default function AddBlog(){
const nav = useNavigate();
const [values, setValues] = useState({ page:'blog', category:'Latest', author:'VidhikMantra Team' });
const [saving, setSaving] = useState(false);


function onChange(k,v){ setValues(prev=>({ ...prev, [k]: v })); }


async function handleSave(){
if(!values.title || !values.content) return alert('Title and content required');
setSaving(true);
try{ const r = await axios.post(`${BACKEND}/api/blogs`, values); nav(`/admin/blogs/${r.data._id || r.data.id}`); }catch(e){ alert('Save failed'); } finally{ setSaving(false); }
}


return (
<div>
<div className="list-top">
<h3>Add Blog</h3>
</div>
<DynamicForm schema={schema} values={values} onChange={onChange} gridCols={1}>
<div className="form-actions">
<button className="btn primary" onClick={handleSave} disabled={saving}>{saving? 'Saving...':'Save'}</button>
</div>
</DynamicForm>
</div>
);
}