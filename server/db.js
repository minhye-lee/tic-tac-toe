const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/test_DB';
mongoose.Promise = global.Promise;


module.exports = () => {
    mongoose.connect(mongoDB, {
        useNewUrlParser: true
    }).then(
        () => {
            console.log('Database is connected');
        },
        err => {
            console.log.bind(console, 'Check DB - connection error');
        }
    );
    require('./user.js');    

}