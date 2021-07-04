const Mongoose = require('mongoose');

const tvCategories = Mongoose.Schema({
    category_Name: {
        type: String,
        default: ''
    },
    created_at : {
        type: Date,
        default: Date.now()
    }
})

module.exports = Mongoose.model('tvCategories', tvCategories);
