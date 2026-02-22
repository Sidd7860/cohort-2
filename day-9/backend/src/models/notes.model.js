const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title : String,
    content : String,
});
  const notModel = mongoose.model('Notes', noteSchema);   

  module.exports = notModel;    