import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoteForm from './NoteForm';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get('http://localhost:8000/api/notes/');
      setNotes(response.data);
    }
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}/`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {showNoteForm ? (
        <NoteForm setNotes={setNotes} />
      ) : (
        <div>
          <div className="flex justify-between items-center my-8">
            <h1 className="text-3xl font-medium text-gray-900">Notes</h1>
            <button
              onClick={() => setShowNoteForm(true)}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Create Note
            </button>
          </div>
          {notes.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <li key={note.id} className="border border-gray-400 rounded-lg overflow-hidden shadow-md">
                  <Link to={`/notes/${note.id}/`} className="block">
                    <img src={note.cover_image} alt="" className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h2 className="text-lg font-medium text-gray-900">{note.title}</h2>
                      <p className="mt-2 text-gray-600">{note.body.slice(0, 100)}...</p>
                    </div>
                  </Link>
                  <div className="bg-gray-100 px-4 py-3">
                    <button
                      className="text-red-500 font-medium hover:text-red-600"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notes found.</p>
      )}
    </div>
  )}
</div>
  );
}

export default NoteList;



