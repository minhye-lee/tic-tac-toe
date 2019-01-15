const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
const routes = require('./routes.js');
const PORT = process.env.PORT || 4000;
const db = require('./db.js');
db();
app.use('/', routes);



app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
});