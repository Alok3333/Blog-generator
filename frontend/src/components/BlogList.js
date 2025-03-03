import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Navigate to the create post page
  const handleNewPostClick = () => {
    navigate("/new");
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Blog Posts
      </Typography>

      {/* Button to navigate to the create new post page */}
      <Button
        variant="contained"
        color="success"
        onClick={handleNewPostClick}
        sx={{ marginBottom: "20px" }}
      >
        Create New Post
      </Button>

      <TextField
        label="Search Blog Posts"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      {!posts ? (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s",
                }}
                className="card-hover"
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2 }}
                  >
                    {post.content.slice(0, 100)}...
                  </Typography>
                  <Link to={`/post/${post._id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ padding: "6px 16px" }}
                    >
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Demo data for showing
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s",
              }}
              className="card-hover"
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Blog demo
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  This is Blog demo content
                </Typography>
                <Link to={`/post/1`}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "6px 16px" }}
                  >
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BlogList;
