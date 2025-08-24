import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const ADMIN_EMAILS = ["admin1@example.com", "admin2@example.com"];

const AddArticleForm = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email);

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    date: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await addDoc(collection(db, "articles"), form);
      setSuccess("Article added successfully!");
      setForm({ title: "", category: "", content: "", author: "", date: "" });
    } catch (err) {
      setError("Failed to add article.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
      <h2>Add New Article</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input name="date" value={form.date} onChange={handleChange} placeholder="Date (YYYY-MM-DD)" required />
      <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Article"}</button>
      {success && <p style={{color: 'green'}}>{success}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default AddArticleForm;
