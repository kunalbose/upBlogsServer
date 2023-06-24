const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model("blog", BlogSchema);