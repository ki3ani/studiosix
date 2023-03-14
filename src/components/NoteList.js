import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/notes/')
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDeleteNote = id => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}/`)
      .then(res => {
        const newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
      })
      .catch(err => console.log(err));
  };

  const handleCreateNote = () => {
    navigate('/create');
  };

  return (
    <div className="flex flex-wrap">
      {notes.length === 0 ? (
        <p>No notes found. Please create a new note.</p>
      ) : (
        notes.map(note => (
          <div
            key={note.id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
          >
            <div className="border rounded shadow p-4 h-full">
              <Link to={`/notes/${note.id}`}>
                <img
                  src={note.cover_image}
                  alt=""
                  className="w-full h-32 object-cover"
                />
                <h2 className="text-lg font-bold my-2">{note.title}</h2>
              </Link>
              <p className="text-gray-500 text-sm my-2">
                Updated at: {note.updated}
              </p>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <div
          onClick={handleCreateNote}
          className="border rounded shadow p-4 h-full cursor-pointer text-center"
        >
          <p className="text-3xl text-gray-500">+</p>
          <p className="text-sm font-bold text-gray-500">Create Note</p>
        </div>
      </div>
    </div>
  );
};

export default NoteList;
