
import React from 'react';


export default function DynamicForm({ schema, values, onChange, gridCols=2, children }){
const gridClass = `df-grid cols-${gridCols}`;
return (
<form className="dynamic-form" onSubmit={e => e.preventDefault()}>
<div className={gridClass}>
{schema.map(f => (
<div className="df-field" key={f.name}>
<label className="df-label">{f.label}{f.required? ' *':''}</label>
{renderInput(f, values[f.name], v => onChange(f.name, v))}
{f.help && <small className="df-help">{f.help}</small>}
</div>
))}
</div>
{children}
</form>
);
}


function renderInput(field, value, onChange){
const t = field.type || 'text';
if(t === 'textarea') return <textarea className="input textarea" rows={field.rows||4} value={value||''} onChange={e=>onChange(e.target.value)} />;
if(t === 'tags') return <input className="input" value={value||''} placeholder={field.placeholder||'comma,separated,tags'} onChange={e=>onChange(e.target.value)} />;
if(t === 'select') return (
<select className="input" value={value||''} onChange={e=>onChange(e.target.value)}>
<option value="">-- Select --</option>
{field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
</select>
);
return <input className="input" type={t} value={value||''} placeholder={field.placeholder||''} onChange={e=>onChange(e.target.value)} />;
}