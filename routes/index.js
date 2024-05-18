// 서버의 루트 경로로 들어온 요청을 처리하는 모듈

/** Express 코어 모듈 */
const express = require("express");

/** Express가 제공해주는 router 모듈 가져오기
 * 각 경로마다 router라는 mini app이 존재한다는 컨셉
 */
const router = express.Router();

/** http://localhost:3000/ 경로로 HTTP GET 요청이 들어올 경우 처리 */
router.get("/", function (req, res, next) {
    console.log("GET!");
});

/** http://localhost:3000/ 경로로 HTTP POST 요청이 들어올 경우 처리 */
router.get("/", function (req, res, next) {
    console.log("POST!");
});

/** http://localhost:3000/ 경로로 HTTP DELETE 요청이 들어올 경우 처리 */
router.get("/", function (req, res, next) {
    console.log("DELETE!");
});

/** http://localhost:3000/users 경로로 특정 가변값(:userId)이 포함된 요청이 들어올 경우 처리 */
router.get("/users/:userId", function (req, res, next) {
    console.log("GET, /users/:userId");
});

module.exports = router;