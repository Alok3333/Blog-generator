import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import NewPostForm from "./components/NewPostForm";
import EditPostForm from "./components/EditPostForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/new" element={<NewPostForm />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/edit/:id" element={<EditPostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
