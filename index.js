require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 
const setupSwagger = require('./swagger'); 

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true
}));

// 🔹 사용자용 라우터 불러오기
const userRoutes = require('./routes/user/users');
const studyGroupRoutes = require('./routes/user/studyGroups');
const groupMemberRoutes = require('./routes/user/groupMembers');
const studyScheduleRoutes = require('./routes/user/studySchedules');
const attendanceRoutes = require('./routes/user/attendance');
const notificationRoutes = require('./routes/user/notifications');

// 🔹 관리자용 라우터 불러오기
const adminUserRoutes = require('./routes/admin/users');
const adminStudyGroupRoutes = require('./routes/admin/studyGroups');
const adminGroupMemberRoutes = require('./routes/admin/groupMembers');
const adminStudyScheduleRoutes = require('./routes/admin/studySchedules');
const adminAttendanceRoutes = require('./routes/admin/attendance');
const adminNotificationRoutes = require('./routes/admin/notifications');

// 🔹 사용자용 라우터 연결
app.use('/users', userRoutes);
app.use('/studygroups', studyGroupRoutes);
app.use('/group-members', groupMemberRoutes);
app.use('/study-schedules', studyScheduleRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/notifications', notificationRoutes);

// 🔹 관리자용 라우터 연결
app.use('/admin/users', adminUserRoutes);
app.use('/admin/studygroups', adminStudyGroupRoutes);
app.use('/admin/group-members', adminGroupMemberRoutes);
app.use('/admin/study-schedules', adminStudyScheduleRoutes);
app.use('/admin/attendance', adminAttendanceRoutes);
app.use('/admin/notifications', adminNotificationRoutes);

// 🔹 Swagger 세팅
setupSwagger(app);

// 🔹 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello! API 서버가 실행 중입니다.');
});

// 🔹 DB 연결 및 서버 시작
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB 연결 성공!');
    return sequelize.sync();  // 개발 단계에서 테이블 생성/동기화
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Swagger 문서: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌ DB 연결 실패:', err);
  });