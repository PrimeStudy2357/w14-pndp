// 서버의 루트 경로로 들어온 요청을 처리하는 모듈

/** Express 코어 모듈 */
const express = require("express");

/** Node 제공 파일 시스템 관련 모듈 */
const fs = require("fs");

/** Express가 제공해주는 router 모듈 가져오기
 * 각 경로마다 router라는 mini app이 존재한다는 컨셉
 */
const router = express.Router();

/** http://localhost:3000/ 경로로 HTTP GET 요청이 들어올 경우 처리 */
router.get("/", function (req, res, next) {
    // 홈페이지를 렌더링해 사용자에게 전달하기

    // views/index.ejs 파일을 렌더링해 전달
    res.render("index", { title: new Date()});
});

/** http://localhost:3000/ 경로로 HTTP POST 요청이 들어올 경우 처리 */
router.post("/", function (req, res, next) {
    // 요청 body로부터 메시지를 받아 파일에 저장하기

    // 요청 객체로부터 사용자의 요청에 담겨있는 body 정보를 가져옴
    // JSON 형태로 전달 되었음을 가정하고 그 안에 message 값을 읽어온다.
    const userMessage = req.body.message;

    // 사용자로부터 받은 정보를 서비스에 사용
    // 여기선 메시지를 서버 측 파일에 기록하는 서비스
    fs.appendFileSync("db.txt", userMessage);

    // 처리가 잘 되었음을 알려주는 메시지를 응답 객체에 담아서 전달
    res.status(201).json({
        message: "DONE",
    });
});

/** http://localhost:3000/ 경로로 HTTP DELETE 요청이 들어올 경우 처리 */
router.delete("/", function (req, res, next) {
    // 해당 경로의 기능은 현재 제공되지 않음을 나타내는 메시지를 반환

    // 이 경우 평문(Plain Text)를 응답으로 보내고 있음
    res.status(500).send("NOT implemented!");
});

/** http://localhost:3000/users 경로로 특정 가변값(:userId)이 포함된 요청이 들어올 경우 처리 */
router.get("/users/:userId", function (req, res, next) {
    // userId 값을 가지는 사용자에 대한 정보를 반환

    // 사용자가 요청을 보낸 URL로부터 userId 값을 가져옴
    const userId = req.params.userId;

    // 사용자 정보를 담아서 페이지를 렌더링해 응답
    res.render("index", { title: `Hello user #${userId}`});
});

module.exports = router;