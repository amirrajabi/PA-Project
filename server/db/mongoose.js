const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('', { useNewUrlParser: true });

module.exports = {
    mongoose
}