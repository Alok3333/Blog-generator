import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPostForm = () => {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/posts', { topic })
      .then((response) => {
        console.log('New post created:', response.data);
        navigate('/');
      })
      .catch((err) => console.error('Error creating post:', err));
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Create a New Blog Post</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Enter Topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ padding: '10px', borderRadius: '8px' }}
          >
            Generate Blog Post
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default NewPostForm;

