import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DynamicForm from '../../components/DynamicData/DynamicForm';
const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';


const schema = [
{ name:'page', label:'Page', type:'text', placeholder:'case-study' },
{ name:'title', label:'Title', type:'text', required:true },
{ name:'summary', label:'Summary', type:'textarea', rows:3, required:true },
{ name:'description', label:'Description', type:'textarea', rows:6 },
{ name:'client', label:'Client', type:'text' },
{ name:'outcome', label:'Outcome', type:'text' },
{ name:'tags', label:'Tags', type:'tags' },
{ name:'image', label:'Image URL', type:'text' }
];


export default function AddCase(){
const nav = useNavigate();
const [values, setValues] = useState({ page:'case-study' });
const [saving, setSaving] = useState(false);
function onChange(k,v){ setValues(prev=>({ ...prev, [k]: v })); }


async function handleSave(){ if(!values.title || !values.summary) return alert('Title and summary required'); setSaving(true); try{ const payload = { ...values, tags: (values.tags||'').split(',').map(t=>t.trim()).filter(Boolean) }; const r = await axios.post(`${BACKEND}/api/casestudies`, payload); nav(`/admin/casestudies/${r.data._id || r.data.id}`); }catch(e){ alert('Save failed'); } finally{ setSaving(false); } }


return (
<div>
<div className="list-top"><h3>Add Case Study</h3></div>
<DynamicForm schema={schema} values={values} onChange={onChange} gridCols={1}>
<div className="form-actions">
<button className="btn primary" onClick={handleSave} disabled={saving}>{saving? 'Saving...':'Save'}</button>
</div>
</DynamicForm>
</div>
);
}