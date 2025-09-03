const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: 알림 관리
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: 전체 알림 조회
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: 전체 알림 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: 단일 알림 조회
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 알림 ID
 *     responses:
 *       200:
 *         description: 알림 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: 알림을 찾을 수 없음
 */
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: 알림 생성
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: 생성된 알림
 *       500:
 *         description: 서버 오류
 */
router.post('/', async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: 알림 수정
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 알림 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: 수정된 알림
 *       404:
 *         description: 알림을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.put('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Not found' });
    await notification.update(req.body);
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: 알림 삭제
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 알림 ID
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       404:
 *         description: 알림을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Not found' });
    await notification.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;