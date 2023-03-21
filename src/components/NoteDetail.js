import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NoteForm from "./NoteForm";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/notes/${id}/`).then((response) => {
      setNote(response.data);
    });
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/notes/${id}/`,
        formData
      );
      setNote(response.data);
      setEditing(false);
      navigate(`/notes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (editing) {
    return <NoteForm note={note} handleSubmit={handleUpdate} />;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto my-8">
      <img
        className="h-64 w-full object-cover mb-4"
        src={note.cover_image}
        alt={note.title}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h1>
      <p className="text-gray-600 text-base mb-4">{note.body}</p>
      <p className="text-gray-500 text-sm">
        Last updated: {note.updated}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setEditing(true)}
      >
        Edit Note
      </button>
    </div>
  );
}

export default NoteDetail;