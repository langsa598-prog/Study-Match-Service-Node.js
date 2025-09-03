require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./config/db') // Sequelize 연결
const setupSwagger = require('./swagger'); // swagger

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true
}));

// 라우터 불러오기
const userRoutes = require('./routes/users');
const studyGroupRoutes = require('./routes/studyGroups');
const groupMemberRoutes = require('./routes/groupMembers');
const studyScheduleRoutes = require('./routes/studySchedules');
const attendanceRoutes = require('./routes/attendance');
const notificationRoutes = require('./routes/notifications');

// 라우터 연결
app.use('/users', userRoutes);
app.use('/studygroups', studyGroupRoutes);
app.use('/group-members', groupMemberRoutes);
app.use('/study-schedules', studyScheduleRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/notifications', notificationRoutes);

setupSwagger(app);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello! API 서버가 실행 중입니다.');
});

// DB 연결 및 서버 시작
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB 연결 성공!');
    // sync 옵션은 개발 단계에서는 force: true 가능 (테이블 덮어쓰기)
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB 연결 실패:', err);
  });