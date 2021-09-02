const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
  },
  dishType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    minimum: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: this.Date,
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
