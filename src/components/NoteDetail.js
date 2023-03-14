import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/notes/${id}/`).then((response) => {
      setNote(response.data);
    });
  }, [id]);

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
    </div>
  );
}

export default NoteDetail;
