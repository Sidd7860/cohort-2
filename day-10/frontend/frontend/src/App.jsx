import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  // Form ke liye state (Dono kaam karega: Create aur Edit)
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null); // Track karega ki hum edit kar rahe hain

  const fetchNotes = () => {
    axios.get('http://localhost:3000/api/notes')
      .then(res => setNotes(res.data.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchNotes(); }, []);

  // Form input change handle karne ke liye
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Jab "Edit" button click ho
  const startEdit = (note) => {
    setEditingId(note._id); // ID set kar di
    setFormData({ title: note.title, content: note.content }); // Form mein data bhar diya
    window.scrollTo(0, 0); // User ko form tak le jao
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // AGAR EDIT MODE HAI (PATCH)
      axios.patch(`http://localhost:3000/api/notes/${editingId}`, formData)
        .then(() => {
          setEditingId(null);
          setFormData({ title: '', content: '' });
          fetchNotes();
        });
    } else {
      // AGAR CREATE MODE HAI (POST)
      axios.post('http://localhost:3000/api/notes', formData)
        .then(() => {
          setFormData({ title: '', content: '' });
          fetchNotes();
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/notes/${id}`).then(() => fetchNotes());
  };

  return (
    <div className="container">
      <h1 className="main-title">Smart Notes App</h1>
      
      {/* Dynamic Form */}
      <form className="create-note-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Update Your Note" : "Create a New Note"}</h3>
        <input 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Title" 
          required 
        />
        <textarea 
          name="content" 
          value={formData.content} 
          onChange={handleChange} 
          placeholder="Content..." 
          required 
        />
        <button type="submit" className={editingId ? "update-btn" : "add-btn"}>
          {editingId ? "Save Changes" : "Add Note"}
        </button>
        {editingId && (
          <button type="button" onClick={() => {setEditingId(null); setFormData({title:'', content:''})}}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map(note => (
          <div className="note-card" key={note._id}>
            <div className="card-content">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => startEdit(note)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;