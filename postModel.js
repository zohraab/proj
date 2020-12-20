
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
   
        author: {
          type: String,
          required: true
        },
        message: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        },

});
const PostModel = mongoose.model("Posts",PostSchema)
module.exports = PostModel