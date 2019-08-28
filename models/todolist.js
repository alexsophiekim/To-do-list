const mongoose = require('mongoose');

const listsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  list: String,
  dueDate:String
});

module.exports = mongoose.model('toDoList',listsSchema);
