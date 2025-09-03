require('dotenv').config();           
const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  process.env.DB_NAME,       // DB 이름: studydb
  process.env.DB_USER,       // DB 사용자: studyuser
  process.env.DB_PASSWORD,   // DB 비밀번호: 12200000
  {
    host: process.env.DB_HOST,          // RDS 엔드포인트
    port: process.env.DB_PORT || 3306,  // 포트 (기본 3306)
    dialect: 'mysql',                   // MySQL 사용
    logging: false,                     // 콘솔에 SQL 출력 안 함
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// 연결 테스트
sequelize.authenticate()
  .then(() => console.log('✅ AWS RDS MySQL 연결 성공'))
  .catch(err => console.error('❌ AWS RDS MySQL 연결 실패:', err));

module.exports = sequelize;