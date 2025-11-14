// src/pages/DailyNews/EditDailyNews.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DynamicForm from "../../components/DynamicData/DynamicForm";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

const schema = [
  { name: "headline", label: "Headline", type: "text", required: true },
  { name: "image", label: "Image URL", type: "text" },
  { name: "shortDescription", label: "Short Description", type: "textarea", rows: 4, required: true },
  { name: "fullNews", label: "Full News", type: "textarea", rows: 10, required: true },
];

export default function EditDailyNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${BACKEND}/api/dailynews/${id}`);
        setValues(res.data || {});
      } catch {
        alert("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function onChange(k, v) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await axios.put(`${BACKEND}/api/dailynews/${id}`, values);
      navigate("/admin/dailynews");
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="muted">Loading...</div>;

  return (
    <div>
      <div className="list-top">
        <h3>Edit Daily News</h3>
      </div>

      <DynamicForm schema={schema} values={values} onChange={onChange} gridCols={1}>
        <button className="btn primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </DynamicForm>
    </div>
  );
}
