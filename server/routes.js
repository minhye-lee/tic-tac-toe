const express = require('express');
const router = express.Router();
const User = require('./user.js');

//라우터

//회원가입
router.post("/api/newUser", (req, res) => signIn(req, res));
//모든 유저 가져오기
router.get("/api/getUser", (req, res) => getUser(req, res));

router.post("/api/getUsername", (req, res) => {
    let _user1 = req.body.user1;
    let _user2 = req.body.user2;
    authUser(_user1, (err, docs) => {
        if(err) console.log(err);
        if(docs) {
            console.log("qq");
            res.redirect('/');
        } else {
            console.log("ww");
            res.redirect('/');
        }
    });
});
//유저 이름 가져오기 (이미 동일 유저이름이 존재한다면)

module.exports = router;

//회원가입
const signIn = (req, res) => {
    if (req.body.name) {
        User.findOneAndUpdate({
            _name: req.body.name
        }, {
            $set: {
                _name: req.body.name
            }
        }, {
            upsert: true
        }, (err, users) => {
            console.log(users);
            if (users) console.log('duplicated');
        })
    } else {
        console.log('insert name');
    }

    res.redirect('/');
}
//모든 유저
const getUser = (req, res) => {
    User.find((err, users) => {
        if (err) return res.status(500).send({
            error: 'database fail!'
        });

        res.send(users);
    })
}
const authUser = (user, callback) => {
    console.log('user ' + user);
    User.find({_name : user}, (err, docs) => {
        if (err) {
            callback(err, null);
        }
        if(docs.length > 0) {
            console.log('find user ' + docs );
            callback(null, docs);
        } else {
            console.log('can not find' + docs);
            callback(null, null);
        }
    });
}