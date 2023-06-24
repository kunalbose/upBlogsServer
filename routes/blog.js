const router = require("express").Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res)=>{
    try{
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    }catch(err){
        return res.status(500).json(err);
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json("Blog not found");
        }
        return res.status(200).json(blog);
    }catch(err){
        return res.status(500).json(err);
    }
})

router.post('/', async(req, res)=>{
    const {userId, title, content} = req.body;
    if(!userId || !title || !content){
        return res.status(400).json("Content Missing");
    }
    try{
        const newBlog = new Blog({
            author: userId,
            title,
            content
        });
        const blog = await newBlog.save();
        if(!blog){
            return res.status(500).json("Could not save blog.");
        }
        return res.status(201).json(blog._doc);
    }catch(err){
        return res.status(500).json(err);
    }
})

router.delete("/:id", async(req, res)=>{
    const id = req.params.id;
    const userId = req.headers.userid;
    try{
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json("Blog does not exist");
        }
        const { author } = blog;
        if(author.valueOf() !== userId){
            return res.status(401).json("You do not have permission to delete the blog.");
        }
        await Blog.findByIdAndDelete(id);
        return res.status(201).json(blog);
    }catch(err){
        return res.status(500).json(err);
    }
})

router.patch('/:id', async(req, res)=>{
    const {title, content, userId} = req.body;
    const id = req.params.id;
    try{
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json(`blog with id ${id} not found`);
        }
        if(blog.author.valueOf() !== userId){
            return res.status(401).json("You do not have permission to update the blog.");
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            $set: {
                title,
                content
            }
        }, {new: true});

        if(!updatedBlog){
            return res.status(500).json("error while updating blog document.");
        }
        return res.status(201).json(updatedBlog);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;