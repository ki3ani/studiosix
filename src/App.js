import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // import Routes component
import Footer from "./components/Footer";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Routes> {/* wrap Routes around all Route components */}
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/notes/*"
              element={<PrivateRoute element={<NoteList />} />}
            />
            <Route
              path="/notes/:id"
              element={<PrivateRoute element={<NoteDetail />} />}
            />
            <Route
              path="/notes/:id/edit"
              element={<PrivateRoute element={<NoteForm />} />}
            />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
