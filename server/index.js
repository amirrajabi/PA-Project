//---Config
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const _ = require('lodash');

const {User} = require('./model/user');

console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);

const app = express();
app.use(express.json());

mongoose.set('useCreateIndex', true);

app.post('/api/users', (req, res) => {
    const body = _.pick(req.body, ['fullname', 'email', 'password']);

    console.log(body);

    let user = new User(body);

    user.save().then((user) => {
        res.status(200).send(user);
    }, (err) => {
        res.status(400).json({
            Error : `Something went wrong. ${err}`
        });
    });

});

app.post('/api/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).status(200).send(token);
        }, (err) => {
            res.status(400).json({
                Error: `Something went wrong. ${err}`
            });
        });
    })
});

app.listen(config.get('PORT'), () => {
    console.log(`Server is running on port ${config.get('PORT')}`);
});



// let newUser = new User({
//     fullName: 'Amir Rajabi',
//     email: 'amirrajabi.neo@gmail.com',
//     password: '123456'
// });

// newUser.save().then((user) => {
//     console.log('User has been saved to d\the database', user);
// })

// console.log(config.get('MONGOURI'));
// console.log(config.get('PORT')); 