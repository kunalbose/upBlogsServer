const express = require("express");
const cors = require("cors");
const dbConnect = require("./db");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
require('dotenv').config();

const app = express();

app.use(cors());

const port = process.env.PORT || 8800;

dbConnect().catch(err => console.log(err));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})