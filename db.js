const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo server connected...");
}

module.exports = main;