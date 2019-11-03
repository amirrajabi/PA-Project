// ---Config
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');
const express = require('express');
const _ = require('lodash');

const { User } = require('./model/user');

console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);

const app = express();
app.use(express.json());

app.post('/api/users', (req, res) => {
    const body = _.pick(req.body, ['fullName', 'email', 'password']);
    let user = new User(body);

    user.save().then((user) => {
        res.status(200).send(user);
    }, (err) => {
        res.status(400).json({
            Error: `Something went wrong.${err}`
        })
    })

});

app.listen(config.get('PORT'), () => {
    console.log(`Server is running on port ${config.get('PORT')}`)
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