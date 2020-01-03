const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: String
  },

  text: {
    type: String
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
