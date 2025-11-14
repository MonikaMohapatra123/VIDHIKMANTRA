// src/pages/DailyNews/AddDailyNews.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddDailyNews() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);

  function onChange(k, v) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSave() {
    if (!values.headline || !values.shortDescription || !values.fullNews) {
      return alert("All required fields must be filled.");
    }

    setSaving(true);
    try {
      const res = await axios.post(`${BACKEND}/api/dailynews`, values);
      navigate(`/admin/dailynews/${res.data._id}`);
    } catch (err) {
      alert("Failed to save news");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="list-top">
        <h3>Add Daily News</h3>
      </div>

      <DynamicForm schema={schema} values={values} onChange={onChange} gridCols={1}>
        <div className="form-actions">
          <button onClick={handleSave} className="btn primary" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </DynamicForm>
    </div>
  );
}
