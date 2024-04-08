const { Router } = require("express");
const router = Router();
const Blog = require("../modle/blog");
const Comment = require("../modle/comment");
const jwt = require("jsonwebtoken");



router.get("/blogId/:id", async (req, res) => {

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/all", async (req, res) => {
  try {
    //const blogs = await Blog.find();
    const blogs = await Blog.find({}).populate('createdBy');
    res.json(blogs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/add-new", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
   console.log(token)
  try {
    const decoded = jwt.decode(token);
    console.log(decoded)
    const { descreption, title, body, coverImageURL, createdBy } = req.body;
    const blog = await Blog.create({
      descreption,
      body,
      title,
      coverImageURL,
      createdBy: decoded.userId,
      // createdBy: decoded.username 
      // createdBy: createdUser._id 
    });
    console.log(blog);
    return res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/get/user', async (req, res) => {

  const userId = await Blog.findById(req.params.id);
  // console.log(userId)
  try {

    const blogs = await Blog.find({ user: userId });
    // console.log(blogs)
    return res.status(201).json(blogs);
    // res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post("/comment/:blogId", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
 
  try {
    const decoded = jwt.decode(token);
    const comment = await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      // createdBy: req.user._id,
      createdBy: decoded.userId,

    });


    return res.status(200).json(comment);
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});





router.get("/all/:blogId/comment", async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).populate("createdBy");
    res.json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/delete/:id/comment", async (req, res) => {
  try {

    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});






router.get("/:id", async (req, res) => {

  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    //  console.log("blog",blog)
    return res.status(200).json({ blog, user: req.user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

module.exports = router;


