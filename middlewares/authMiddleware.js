function isAdmin(req, res, next) {
  // 예시: 세션에 role이 'admin'이면 관리자
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: '관리자만 접근 가능합니다.' });
}

module.exports = { isAdmin };