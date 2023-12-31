
const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
   },
   position: {
      type: String,
     // required: true,
      min: 6,
      max: 255
   },
   age: {
      type: Number,
      required: true,
      min: 1,
      max: 40
   },
   date: {
      type: String,
      default: Date.now()
   }

})




module.exports = mongoose.model("Player", playerSchema);