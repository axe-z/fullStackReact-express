const mongoose = require('mongoose');
//const Schema = mongoose.Schema; OU
const { Schema } = mongoose;


//on peut toujours ajouter des champs plus tard
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
})

//mongoose.model('users', userSchema);
const User = mongoose.model('users', userSchema);
//toujours mettre le model en lowercase, mlabs va le faire sinon


module.exports = {User};
