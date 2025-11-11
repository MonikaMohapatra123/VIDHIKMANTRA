import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DynamicForm from '../../components/DynamicData/DynamicForm';

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  'https://vidhik-mantra-backend.vercel.app';

const schema = [
  { name: 'page', label: 'Page', type: 'text' },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'summary', label: 'Summary', type: 'textarea', rows: 3, required: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 6 },
  { name: 'client', label: 'Client', type: 'text' },
  { name: 'outcome', label: 'Outcome', type: 'text' },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'image', label: 'Image URL', type: 'text' }
];

export default function EditCase() {
  const { id } = useParams();
  const nav = useNavigate();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const r = await axios.get(`${BACKEND}/api/casestudies/${id}`);
        const data = r.data || {};
        data.tags = (data.tags || []).join(', ');
        setValues(data);
      } catch (e) {
        alert('Load failed');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]); // ✅ safe dependency

  function onChange(k, v) {
    setValues(prev => ({ ...prev, [k]: v }));
  }

  async function handleSave() {
    if (!values.title || !values.summary)
      return alert('Title and summary required');

    setSaving(true);

    try {
      const payload = {
        ...values,
        tags: (values.tags || '')
          .split(',')
          .map(t => t.trim())
          .filter(Boolean)
      };

      await axios.put(`${BACKEND}/api/casestudies/${id}`, payload);
      nav('/admin/casestudies');
    } catch (e) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="muted">Loading...</div>;

  return (
    <div>
      <div className="list-top"><h3>Edit Case Study</h3></div>

      <DynamicForm schema={schema} values={values} onChange={onChange} gridCols={1}>
        <div className="form-actions">
          <button className="btn primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </DynamicForm>
    </div>
  );
}
