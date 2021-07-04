const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email : {
        type: String,
        lowercase: true,
       // required: [true, Constants.messages.fieldMiss + 'email'],
       // unique: [true, Constants.messages.email],
        trim: true,
        // validate: {
        //     validator: (email) => {
        //         return Validotors.IsValidEmail(email);
        //     },
        //     message: props => `${props.value} is not a valid email!`
        // } 
    },
    password : {
        type : String
    },
    dob : {
        type : Date,
        default : Date.now()
    },
    user : {
        type: String,
        default: 'user'
    },
    gender : {
        type : String,
        default : ''
    },
    mobile : {
        type : Number,
        default : null
    },
    address: [
        {
            dno: String,
            default: ''
        },
        {
            street_1: String,
            default: ''
        },
        {
            street_2: String,
            default: ''
        },
        {
            city: String,
            default: ''
        },
        {
            state: String,
            default: ''
        },
        {
            country: String,
            default: ''
        },
    ],
    token : {
        type: String,
        default: ''
    },
    confirmToken : {
        type: String,
        default: ''
    },
    activate: {
        type: Boolean,
        default: false
    },
    last_login : {
        type : Date,
        default: null
    },
    last_logout: {
        type: Date,
        default: null
    },
    signup_date : {
        type: Date,
        default: Date.now()
    },
    roles_permission: {        
        type: String
    },
    profileImage: {
        type: String,
        default: ''
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hash: String,
    salt: String
})

module.exports = Mongoose.model('users', userSchema);
