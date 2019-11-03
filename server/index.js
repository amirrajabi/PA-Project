// ---Config
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');

console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);



// console.log(config.get('MONGOURI'));
// console.log(config.get('PORT'));