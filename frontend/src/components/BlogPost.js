import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import axios from "axios";

const BlogPost = () => {
  const { id } = useParams(); // Getting the post id from the URL parameters
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the blog post details based on the id
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <CircularProgress sx={{ marginTop: "20px" }} />;

  // Handle the delete operation
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => navigate("/")) // Redirect to homepage after deleting
      .catch((err) => console.error("Error deleting post:", err));
  };

  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            {post.content}
          </Typography>

          {/* Back to All Posts Button */}
          <Link to="/">
            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginTop: "20px" }}
            >
              Back to All Posts
            </Button>
          </Link>

          {/* Edit Post Button */}
          <Link to={`/edit/${post._id}`}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Edit Post
            </Button>
          </Link>

          {/* Delete Post Button */}
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ marginTop: "20px", marginLeft: "10px" }}
          >
            Delete Post
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogPost;

