const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String
    //unique: true
  },

  link: {
    type: String
  },

  description: {
    type: String
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],

  created_at: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
