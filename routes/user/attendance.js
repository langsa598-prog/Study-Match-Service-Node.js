const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: 출석 체크 관리
 */

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: 전체 출석 기록 조회
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: 전체 출석 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 */
router.get('/', async (req, res) => {
  try { res.json(await Attendance.findAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /attendance/{id}:
 *   get:
 *     summary: 단일 출석 기록 조회
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 출석 ID
 *     responses:
 *       200:
 *         description: 출석 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: 출석 기록을 찾을 수 없음
 */
router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Not found' });
    res.json(attendance);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: 출석 기록 생성
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       201:
 *         description: 생성된 출석 기록
 *       500:
 *         description: 서버 오류
 */
router.post('/', async (req, res) => {
  try { res.status(201).json(await Attendance.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /attendance/{id}:
 *   put:
 *     summary: 출석 기록 수정
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 출석 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: 수정된 출석 기록
 *       404:
 *         description: 출석 기록을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.put('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Not found' });
    await attendance.update(req.body);
    res.json(attendance);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * @swagger
 * /attendance/{id}:
 *   delete:
 *     summary: 출석 기록 삭제
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 출석 ID
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       404:
 *         description: 출석 기록을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Not found' });
    await attendance.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;