const express = require('express');
const router = express.Router();
const StudyGroup = require('../models/StudyGroup');

// 전체 스터디 그룹 조회
router.get('/', async (req, res) => {
  try {
    const groups = await StudyGroup.findAll();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단일 스터디 그룹 조회
router.get('/:id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 스터디 그룹 생성
router.post('/', async (req, res) => {
  try {
    const group = await StudyGroup.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 스터디 그룹 수정
router.put('/:id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    await group.update(req.body);
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 스터디 그룹 삭제
router.delete('/:id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    await group.destroy();
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;