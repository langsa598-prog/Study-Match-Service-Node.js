const express = require('express');
const router = express.Router();
const StudyGroup = require('../../models/StudyGroup');

/**
 * @swagger
 * tags:
 *   name: AdminStudyGroups
 *   description: 관리자용 스터디 그룹 API
 */

/**
 * @swagger
 * /admin/studygroups:
 *   get:
 *     summary: 모든 스터디 그룹 조회
 *     tags: [AdminStudyGroups]
 *     responses:
 *       200:
 *         description: 스터디 그룹 목록
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
 * /admin/studygroups/{group_id}:
 *   get:
 *     summary: 단일 스터디 그룹 조회
 *     tags: [AdminStudyGroups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 스터디 그룹 ID
 *     responses:
 *       200:
 *         description: 스터디 그룹 정보
 *       404:
 *         description: 그룹이 존재하지 않음
 */
router.get('/:group_id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.group_id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /admin/studygroups:
 *   post:
 *     summary: 스터디 그룹 생성
 *     tags: [AdminStudyGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudyGroup'
 *     responses:
 *       201:
 *         description: 생성된 스터디 그룹
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
 * /admin/studygroups/{group_id}:
 *   put:
 *     summary: 스터디 그룹 수정
 *     tags: [AdminStudyGroups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 스터디 그룹 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudyGroup'
 *     responses:
 *       200:
 *         description: 수정된 스터디 그룹
 *       404:
 *         description: 그룹이 존재하지 않음
 */
router.put('/:group_id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.group_id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    await group.update(req.body);
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /admin/studygroups/{group_id}:
 *   delete:
 *     summary: 스터디 그룹 삭제
 *     tags: [AdminStudyGroups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 스터디 그룹 ID
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       404:
 *         description: 그룹이 존재하지 않음
 */
router.delete('/:group_id', async (req, res) => {
  try {
    const group = await StudyGroup.findByPk(req.params.group_id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    await group.destroy();
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;