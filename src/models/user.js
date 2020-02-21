const { Schema ,  model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const User =  new Schema({
   name: {type: String ,  required: true},
   email: { type: String , required: true ,  unique:  true },
   password:  { type: String , required: true}
}, {
    timestamps: true
});

User.methods.encryptPassword = password => {
  return bcryptjs.hashSync(password , bcryptjs.genSaltSync(10))
};

User.methods.matchPassword = function (password) {
    return bcryptjs.compareSync(password, this.password)
}


module.exports = model('user' , User)