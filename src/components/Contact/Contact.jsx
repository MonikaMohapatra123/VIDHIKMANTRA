// src/components/ContactMinimal/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';


export default function ContactMinimal({ submitUrl = '/api/contact', phone = '+91 90000 00000', email = 'hello@vidhikmantra.example' }) {
const [f, setF] = useState({ name: '', email: '', message: '' });
const [s, setS] = useState({ loading: false, ok: null, msg: '' });


const submit = async e => {
e.preventDefault();
if (!f.name || !f.email || !f.message) { setS({ loading: false, ok: false, msg: 'Please fill all fields.' }); return; }
setS({ loading: true, ok: null, msg: '' });
try {
await fetch(submitUrl, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(f)});
setS({ loading: false, ok: true, msg: 'Sent — we will contact you.' });
setF({ name: '', email: '', message: '' });
} catch { setS({ loading: false, ok: false, msg: 'Failed — try later.' }); }
};


return (
<section className="cm-min">
<div className="cm-min-card">
<h3 className="cm-min-title">Get a free consult</h3>
<p className="cm-min-sub">Quick, private, no obligation.</p>


<form onSubmit={submit} className="cm-min-form">
<input value={f.name} onChange={e=>setF({...f,name:e.target.value})} placeholder="Full name" />
<input value={f.email} onChange={e=>setF({...f,email:e.target.value})} placeholder="Email" />
<textarea value={f.message} onChange={e=>setF({...f,message:e.target.value})} placeholder="Brief message" />


<div className="cm-min-row">
<button className="cm-min-btn" disabled={s.loading}>{s.loading? 'Sending...' : 'Request Call'}</button>
<div className={`cm-min-status ${s.ok===true? 'ok': s.ok===false? 'err':''}`}>{s.msg}</div>
</div>
</form>


<div className="cm-min-contact">
<a href={`tel:${phone}`} className="cm-min-link">{phone}</a>
<a href={`mailto:${email}`} className="cm-min-link">{email}</a>
</div>
</div>
</section>
);
}