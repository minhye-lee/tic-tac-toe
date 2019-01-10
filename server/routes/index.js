module.exports = function(app) {
    //get username
    app.get('/api/username', function(req, res) {
        res.end();
    });
}