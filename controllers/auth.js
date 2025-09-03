const User = require('../models/User.js'); 
const sanitizeHtml = require('sanitize-html');

// 현재 로그인 상태 확인
function authIsOwner(req) {
  let name = 'Guest';
  let login = '';
  let cls = 'NON';

  if (req.session.is_logined) {
    name = req.session.name;
    login = req.session.loginid || '';
    cls = req.session.cls || 'USER';
  }

  return { name, login, cls };
}

module.exports = {
  authIsOwner,

  // 로그인 페이지
  login: function(req, res) {
    const _auth = authIsOwner(req);
    res.render('mainFrame', {
      who: _auth.name,
      login: _auth.login,
      body: 'login.ejs',
      cls: _auth.cls
    });
  },

  // 로그인 처리
  login_process: async function(req, res) {
    try {
      const post = req.body;
      const username = sanitizeHtml(post.username);
      const password = sanitizeHtml(post.password);

      const user = await User.findOne({ where: { username, password } });

      if (user) {
        req.session.is_logined = true;
        req.session.loginid = user.username;
        req.session.name = user.name;
        req.session.cls = user.role;

        res.redirect('/');
      } else {
        req.session.is_logined = false;
        req.session.name = 'Guest';
        req.session.cls = 'NON';
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('로그인 중 오류 발생');
    }
  },

  // 로그아웃
  logout_process: function(req, res) {
    req.session.destroy(err => {
      res.redirect('/');
    });
  },

  // 회원가입 페이지
  register: function(req, res) {
    if (req.session.is_logined) return res.redirect('/');
    const _auth = authIsOwner(req);
    res.render('mainFrame', {
      who: _auth.name,
      login: _auth.login,
      body: 'register.ejs',
      cls: _auth.cls
    });
  },

  // 회원가입 처리
  register_process: async function(req, res) {
    try {
      const post = req.body;
      const sanitized = {
        username: sanitizeHtml(post.username),
        password: sanitizeHtml(post.password),
        name: sanitizeHtml(post.name),
        email: sanitizeHtml(post.email)
      };

      await User.create(sanitized);
      res.redirect('/login');
    } catch (err) {
      console.error('회원가입 실패:', err);
      res.status(500).send('회원가입 중 오류 발생');
    }
  }
};