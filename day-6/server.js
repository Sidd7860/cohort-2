const app = require('./src/app');

const mongoose = require('mongoose');

function connectToDatabase() {
  mongoose.connect('mongodb+srv://siddzibran_db_user:C13XlXBNbDoyfZqT@cluster0.ayhqo6k.mongodb.net/day-6')  
  .then (() => {
    console.log('Connected to MongoDB');
});
}

connectToDatabase();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
} );