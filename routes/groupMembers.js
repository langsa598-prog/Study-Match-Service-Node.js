const express = require('express');
const router = express.Router();
const GroupMember = require('../models/GroupMember');

// 전체 조회
router.get('/', async (req, res) => {
  try {
    const members = await GroupMember.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 생성
router.post('/', async (req, res) => {
  try {
    const member = await GroupMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    await member.update(req.body);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    await member.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;