/** Node 제공 http 서버 모듈 */
const http = require("http");

/** Express 코어 모듈 */
const express = require("express");
/** 로그 기능 제공 모듈 */
const logger = require("morgan");
/** http 요청으로부터 cookie 정보를 읽어주는 모듈 */
const cookieParser = require("cookie-parser");
/** Node에서 시스템 경로를 다룰 수 있도록 해주는 모듈 */
const path = require("path");

/** 우리가 구현할 Controller 모듈, 루트(/) 경로에 해당 */
const rootRouter = require("./routes/index");

/** Express 서버 인스턴스 생성 */
const app = express();

// Express 환경 설정, views/ 경로를 뷰 파일이 있는 폴더로 지정
app.set("views", path.join(__dirname, "views"));
// HTML 템플릿 언어를 ejs로 설정
app.set("view engine", "ejs");

// morgan 로깅 모듈 사용 (미들웨어 사용)
app.use(logger("dev"));
// 아래 두 Express 기본 제공 미들웨어는 사용자의 요청으로부터 데이터를 파싱해주는 역할
// 데이터가 담긴 방식은 http 헤더 중 'content-type'에 정의
app.use(express.json()); // 'content-type': 'application/json'
app.use(express.urlencoded({extended: false})); // 'content-type': 'application/x-www-form-urlencoded'
// 요청으로부터 cookie 정보를 읽어주는 미들웨어 사용
app.use(cookieParser());

// 우리가 구현한 Root Controller 모듈을 루트 경로에 할당 (Routing)
app.use("/", rootRouter);

// Node 기본 http 모듈에 express 인스턴스를 집어넣어 서버 생성
const server = http.createServer(app);

// 3000번 포트에서 서버 실행
const port = 3000;
server.listen(port);