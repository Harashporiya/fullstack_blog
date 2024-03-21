const { Router } = require("express");
const router = Router();
const Blog = require("../modle/blog");


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
    const blogs = await Blog.find();
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
  try {
    const { descreption, title, body , coverImageURL} = req.body;
    const blog = await Blog.create({
      descreption,
      body,
      title,
      coverImageURL,
     
    //   createdBy,
    //  createdBy: req.user._id,
    });
    return res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/get/user', async (req, res) => {
 
  const userId = req.user.id;
  try {
   
    const blogs = await Blog.find({ user: userId });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
