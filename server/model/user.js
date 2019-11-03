const validator = require('validator');

const { mongoose } = require('./../db/mongoose');

let UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `${value} is not valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = {
    User
};