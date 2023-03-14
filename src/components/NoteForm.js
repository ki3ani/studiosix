import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function NoteForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }
    try {
      if (id) {
        await axios.patch(`http://localhost:8000/api/notes/${id}/`, formData);
      } else {
        await axios.post('http://localhost:8000/api/notes/', formData);
      }
      navigate('/notes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cover_image" className="block font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            name="cover_image"
            id="cover_image"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block font-medium text-gray-700">
            Body
          </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="5"
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          ></textarea>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            {id ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;

