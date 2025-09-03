const express = require('express');
const router = express.Router();
const StudyGroup = require('../../models/StudyGroup');

/**
 * @swagger
 * tags:
 *   name: StudyGroups
 *   description: 스터디 그룹 관리 API
 */

/**
 * @swagger
 * /studygroups:
 *   get:
 *     summary: 전체 스터디 그룹 조회
 *     tags: [StudyGroups]
 *     responses:
 *       200:
 *         description: 전체 스터디 그룹 목록
 */
router.get('/', async (req, res) => {
  try {
    const groups = await StudyGroup.findAll();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /studygroups/{id}:
 *   get:
 *     summary: 단일 스터디 그룹 조회
 *     tags: [StudyGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 스터디 그룹 ID
 *     responses:
 *       200:
 *         description: 스터디 그룹 정보
 *       404:
 *         description: Group not found
 */
router.get('/:id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /studygroups:
 *   post:
 *     summary: 스터디 그룹 생성
 *     tags: [StudyGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               creatorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 스터디 그룹 생성 완료
 */
router.post('/', async (req, res) => {
  try {
    const group = await StudyGroup.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /studygroups/{id}:
 *   put:
 *     summary: 스터디 그룹 수정
 *     tags: [StudyGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 스터디 그룹 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정된 스터디 그룹 정보
 *       404:
 *         description: Group not found
 */
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

/**
 * @swagger
 * /studygroups/{id}:
 *   delete:
 *     summary: 스터디 그룹 삭제
 *     tags: [StudyGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 스터디 그룹 ID
 *     responses:
 *       200:
 *         description: 스터디 그룹 삭제 완료
 *       404:
 *         description: Group not found
 */
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