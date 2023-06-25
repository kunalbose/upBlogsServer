const router = require("express").Router();
const { getAllBlogs, getBlogById, createNewBlog, deleteBlog, updateBlog } = require("../controllers/blogController");


router.get('/', getAllBlogs);

router.get('/:id', getBlogById);

router.post('/', createNewBlog);

router.delete("/:id", deleteBlog);

router.patch('/:id', updateBlog);

module.exports = router;