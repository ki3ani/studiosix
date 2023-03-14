import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/notes/").then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Link
            to={`/notes/${note.id}`}
            key={note.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:bg-gray-100 transition duration-300"
          >
            <img
              src={note.cover_image}
              alt={note.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{note.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(note.updated).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-base">{note.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
