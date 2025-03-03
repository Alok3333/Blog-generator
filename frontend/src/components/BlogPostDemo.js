import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Button,
} from "@mui/material";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = {
    title: "Blog demo",
    content: "This is Blog demo content",
  };

  const handleDelete = () => {
    alert("Deleted");
    navigate("/");
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
