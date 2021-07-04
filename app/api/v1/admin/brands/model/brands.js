const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Mongoose.Schema({
    brandName: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    }
})

module.exports = Mongoose.model('users', userSchema);
