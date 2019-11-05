//---Config
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { User } = require('./model/user');

console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);

const app = express();
const requestLogger = fs.createWriteStream(path.join(__dirname, 'log/requests.log'));
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(__dirname, 'log/server-status.log') })
    ]
})

app.use(express.json());
app.use(helmet());
app.use(morgan('combined', {stream: requestLogger}));

mongoose.set('useCreateIndex', true);

app.post('/api/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['fullname', 'email', 'password']);
        let user = new User(body);

        await user.save();
        res.status(200).send(user);
    } catch (e) {
        console.log(1, e);
        res.status(400).json({
            Error: `Something went wrong. ${e}`
        });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        console.log("req", req);
        console.log("body", body);
        let user = await User.findByCredentials(body.email, body.password);
        let token = await user.generateAuthToken();
        console.log("user", user);
        console.log("token", token);
        res.header('x-auth', token)
        .status(200)
        .send(token);
    } catch (e) {
        console.log(2, e);
        res.status(400).json({
            Error: `Something went wrong. ${e}`
        });
    }
});

app.listen(config.get('PORT'), () => {
    // console.log(`Server is running on port ${config.get('PORT')}`);
    // logger.log({
    //     level: 'info',
    //     message: `Server running on port ${config.get('PORT')}`
    // })
    logger.info(`Server running on port ${config.get('PORT')}`);
});
