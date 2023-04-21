const mongoose = require('mongoose');
const todo = new mongoose.Schema({
    progress: {
          type: String,
          required: [true, "Progress is required"],
        },
    message: {
        type: String,
        required: [true, "Data is required"],
      },
      check: {
        type: Boolean,
        default : false
      },
})

const Todo = mongoose.model('todo', todo)
module.exports = Todo;