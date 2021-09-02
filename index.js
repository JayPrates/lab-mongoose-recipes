const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    updateDB();
    Recipe.insertMany(data);
    data.forEach(element => {
      console.log(element.title);
    })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  const updateDB = async() => {
    try{
      const createdRecipe = await Recipe.create({
        title: "Arroz de Pato",
        level: "UltraPro Chef",
        ingredient: ["Duck meat", "Rice", "Tomato", "red wine"],
        cuisine: "Portuguese",
        dishType: "Launch",
        image: "https://www.pingodoce.pt/wp-content/uploads/2016/12/arroz-de-pato.jpeg",
        duration: 2,
        creator: "Joao",
      });
      const createdRecipe2 = await Recipe.create({
        title: "Bacalhau à Brás",
        level: "Easy Peasy",
        ingredient: ["Bacalhau", "Potatos", "Eggs", "Salsa"],
        cuisine: "Portuguese",
        dishType: "Launch",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pingodoce.pt%2Freceitas%2Fbacalhau-a-bras-com-legumes%2F&psig=AOvVaw0kcbsfyDvfCtTUV-fKkSLK&ust=1630676612592000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCLjsove14PICFQAAAAAdAAAAABAD",
        duration: 30,
        creator: "Tiago",
      });
      console.log(createdRecipe.title);
      console.log(createdRecipe2.title);
      await Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      {
        duration: 100,
      },  )
  
      await Recipe.deleteOne({title: "Carrot Cake"})
    } finally {
      mongoose.connection.close();
    }
    
};

