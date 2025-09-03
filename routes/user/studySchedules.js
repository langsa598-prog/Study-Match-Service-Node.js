const express = require('express');
const router = express.Router();
const StudySchedule = require('../../models/StudySchedule');

/**
 * @swagger
 * tags:
 *   name: StudySchedules
 *   description: 스터디 일정 관리
 */

/**
 * @swagger
 * /study-schedules:
 *   get:
 *     summary: 전체 스터디 일정 조회
 *     tags: [StudySchedules]
 *     responses:
 *       200:
 *         description: 일정 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudySchedule'
 */
router.get('/', async (req, res) => {
  try { res.json(await StudySchedule.findAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /study-schedules/{id}:
 *   get:
 *     summary: 단일 스터디 일정 조회
 *     tags: [StudySchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 조회할 일정 ID
 *     responses:
 *       200:
 *         description: 일정 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudySchedule'
 *       404:
 *         description: 일정 없음
 */
router.get('/:id', async (req, res) => {
  try {
    const schedule = await StudySchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    res.json(schedule);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /study-schedules:
 *   post:
 *     summary: 스터디 일정 생성
 *     tags: [StudySchedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudySchedule'
 *     responses:
 *       201:
 *         description: 생성 완료
 *       500:
 *         description: 서버 에러
 */
router.post('/', async (req, res) => {
  try { res.status(201).json(await StudySchedule.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /study-schedules/{id}:
 *   put:
 *     summary: 스터디 일정 수정
 *     tags: [StudySchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 수정할 일정 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudySchedule'
 *     responses:
 *       200:
 *         description: 수정 완료
 *       404:
 *         description: 일정 없음
 *       500:
 *         description: 서버 에러
 */
router.put('/:id', async (req, res) => {
  try {
    const schedule = await StudySchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    await schedule.update(req.body);
    res.json(schedule);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /study-schedules/{id}:
 *   delete:
 *     summary: 스터디 일정 삭제
 *     tags: [StudySchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 삭제할 일정 ID
 *     responses:
 *       200:
 *         description: 삭제 완료
 *       404:
 *         description: 일정 없음
 *       500:
 *         description: 서버 에러
 */
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await StudySchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    await schedule.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;