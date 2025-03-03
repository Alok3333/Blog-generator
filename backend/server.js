const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// initalize dotenv
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to mongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    // useNewUrlParse: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("err MongoDB =>", err));

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

// API to get all blog posts
app.get("/api/posts", async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
});

// API to generate and create a blog post (mocked)
app.post("/api/posts", async (req, res) => {
  const { topic } = req.body;
  const newPost = new BlogPost({
    title: `Blog Post on ${topic}`,
    content: `This is a generated blog post about ${topic}.`,
    author: "AI Writer",
  });
  await newPost.save();
  res.json(newPost);
});

// API to get a single post
app.get("/api/posts/:id", async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.json(post);
});

// API to update a single blog post
app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params; // Get the post ID from URL params
  const { title, content, author } = req.body; // Get the new data from the request body

  try {
    // Find the post by ID and update it
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, content, author }, // Update the fields
      { new: true } // Return the updated post
    );

    // If no post is found, send a 404 error
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Send the updated post as the response
    res.json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// API to delete a post
app.delete("/api/posts/:id", async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
