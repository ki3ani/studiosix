import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/create" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
