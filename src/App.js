import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get("http://localhost:8000/api/notes/");
      setNotes(response.data);
    }
    fetchNotes();
  }, []);

  async function handleAddNoteSubmit(note) {
    const response = await axios.post(
      "http://localhost:8000/api/notes/",
      note
    );
    setNotes([...notes, response.data]);
  }

  async function handleUpdateNoteSubmit(note) {
    const response = await axios.put(
      `http://localhost:8000/api/notes/${note.id}/`,
      note
    );
    const updatedNotes = notes.map((n) => (n.id === note.id ? response.data : n));
    setNotes(updatedNotes);
  }

  async function handleDeleteNoteClick(noteId) {
    await axios.delete(`http://localhost:8000/api/notes/${noteId}/`);
    setNotes(notes.filter((n) => n.id !== noteId));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList notes={notes} onDeleteNoteClick={handleDeleteNoteClick} />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/create" element={<NoteForm onSubmit={handleAddNoteSubmit} />} />
        <Route path="/edit/:id" element={<NoteForm onSubmit={handleUpdateNoteSubmit} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
