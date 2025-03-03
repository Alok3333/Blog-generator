import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPostForm = () => {
  const { id } = useParams(); // Get the post id from URL
  const navigate = useNavigate(); // For navigation after save
  const [post, setPost] = useState({ title: '', content: '' });

  // Fetch the existing post data for editing
  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data); // Set the post data to state
      })
      .catch((err) => console.error('Error fetching post:', err));
  }, [id]);

  // Handle form submit to update the post
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Send PUT request to update the post
    axios.put(`http://localhost:5000/api/posts/${id}`, post)
      .then(() => {
        // Redirect to the updated post view after successful update
        navigate(`/post/${id}`);
      })
      .catch((err) => console.error('Error updating post:', err));
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Edit Blog Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          sx={{ marginBottom: '20px' }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ padding: '10px', borderRadius: '8px' }}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditPostForm;
