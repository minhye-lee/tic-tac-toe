const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
const os = require("os");

// const mongoose = require('mongoose');
// const db = mongoose.connection;
// db.on('error' ,console.error);
// db.once('open', function() {
//     console.log("Connected to mongod server!" + db);
// })
// mongoose.connect('mongodb://localhost:27017/tictactoeDB');
// const db = 'mongodb://localhost:27017/tictactoeDB';
// mongoose.connect(db, (error) => {
//     console.log(error);
//     console.log("errer");
// }); //db연결

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/test_DB';
// mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error :'));

mongoose.connect(mongoDB, {useNewUrlParser : true}).then(
    () => { console.log('Database is connected');},
    err => {console.log.bind(console, 'Check DB - connection error');}
);

const PORT = process.env.PORT || 4000;
const Schema = mongoose.Schema;

// const SomeModelSchema = new Schema({
//     a_string : String,
//     a_date : Date
// })
// const SomeModel = mongoose.model('SomeModel', SomeModelSchema);
// var awesome_instance = new SomeModel({a_string: 'awesome111'});
// awesome_instance.save(function(err) {
//     if (err) console.log(err);
// });


const UserSchema = new Schema({
    _name : String,
    _win : Number,
    _lose : Number,
    _draw : Number
});
 const User = mongoose.model('User', UserSchema);
// const minhye_instance = new User({_name : "Minhye"});
// minhye_instance.save(function(err) {
//     if(err) console.log(err);
// });

//app.use(express.static(path.join(__dirname, '..', 'public/')));

//if you need api routes add them here
app.get("/api/getUsername", (req, res) => {
    res.send({ username: os.userInfo().username });
});

//새로운 유저 만들기 (동일이름의 유저가 없다면)
app.post("/api/newUser", (req, res) => {
 
    User.find({_name : req.body.name}, {_name : 1}, (err, users) => {
        if(err) console.log(err);
        else if(users[0]['_name'] === req.body.name) {
            console.log(users[0]['_name']);
            console.log("same name exist");
        }
        else{
            let newUser = new User({
                _name : req.body.name,
                _win : 0,
                _lose : 0,
                _draw : 0
            });
            newUser.save(function(err) {
            if(err) console.log(err);
            })
        }
    }).then( res.redirect('/'));
})

//유저 이름 가져오기 (이미 동일 유저이름이 존재한다면)
app.get("/api/getUser", (req, res) => {
    User.find((err, users) => {
        if(err) return res.status(500).send({error : 'database fail!'});
        res.send(users);
    })
});

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});
