const express = require('express');
const path = require('path');
const os = require("os");
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error' ,console.error);
db.once('open', function() {
    console.log("Connected to mongod server!!!!!!!!!!");
})

mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;
console.log(Schema);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'public/')));

// if you need api routes add them here
app.get("/api/getUsername", function(req, res, next){
res.send({ username: os.userInfo().username });
});


app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});
