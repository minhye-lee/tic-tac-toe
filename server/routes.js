const express = require('express');
const router = express.Router();
const User = require('./user.js');


//라우터

//회원가입
router.post("/api/newUser", (req, res) => signUp(req, res));
//모든 유저 가져오기
router.get("/api/getUser", (req, res) => getUser(req, res));
//로그인
router.post("/api/getUsername", (req, res) => signIn(req, res));
//score저장
router.put("/api/updateScore", (req, res) => updateScore(req, res));

module.exports = router;

//컨트롤러
//api/newUser (회원가입)
const signUp = async (req, res) => {
    let temp_newUser = req.body.name;
    console.log(req.body);
    let newUser = await isDuplicate(temp_newUser); //중복검사
    console.log("newUser " + newUser);
    if(newUser) {
        console.log('welcome newUser');
        await enrollmentUser(newUser); //db입력
        Enrollment = true;
        res.send({enroll : true});
        console.log(req.body);
    } else {
        res.send({enroll : false});
        console.log('already exist');
    }
}
//중복확인
const isDuplicate = (user) => new Promise((resolve) => {
    //console.log("newuser : " + user);
    User.find({_name : user}, (err, docs) => {
        if(err) {
            console.log(err);
        }
        if(docs.length > 0){
            resolve(null);
        } else {
            resolve(user);
        }
    })
})
//중복확인 후에 회원 등록
const enrollmentUser = (user) => new Promise((resolve) => {
    let newUser = new User({_name : user, _win : 0, _lose : 0, _draw : 0, });
    newUser.save((err) => {
        if(err) console.log(err);
        console.log("newUser : " + user);
        resolve(user);
    })
})
//api/getUer (모든 유저)
const getUser = (req, res) => {
    User.find((err, users) => {
        if (err) return res.status(500).send({
            error: 'database fail!'
        });
        res.send(users);
    })
}
//api/getUsername (로그인)
const signIn = async (req, res) => {
    let temp_user1 = req.body.user1;
    let temp_user2 = req.body.user2;

    let auth_user1 = await authUser(temp_user1);
    let auth_user2 = await authUser(temp_user2);
   // console.log("인증된 유저 : " + auth_user1, auth_user2);

    if (auth_user1 && auth_user2) {
        console.log('로그인 성공');
        res.send({login : true, auth_user1 : auth_user1, auth_user2 : auth_user2 });
    } else {
        console.log('로그인 실패');
        res.send({login : false});
    }
}
//유저 인증
const authUser = (user) => new Promise((resolve) => {
    console.log('user ' + user);
    User.find({
        _name: user
    }, (err, docs) => {
        if (err) {}
        if (docs.length > 0) {
            resolve([docs[0]["_name"], docs[0]["_win"], docs[0]["_lose"], docs[0]["_draw"]]);
        } else {
            console.log('can not find' + docs);
            resolve(null);
        }
    });
});
//api/updateScore (유저 스코어 db저장)
const updateScore = async (req, res) => {
    let user1 = req.body.user1;
    let user2 = req.body.user2;
    score1 = await changeScoreDB(user1);
    score2 = await changeScoreDB(user2);
    console.log(score1, score2);
}
const changeScoreDB = (user) => new Promise((resolve) => {
    console.log(user);
    User.updateOne({"_name" : user[0]}, {$set : {"_win" : user[1], "_lose" : user[2], "_draw" : user[3]} },
    (err, docs) => {
        if(err) {
            console.log(err);
        }
    })
})