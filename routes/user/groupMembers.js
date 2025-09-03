const express = require('express');
const router = express.Router();
const GroupMember = require('../../models/GroupMember');

/**
 * @swagger
 * tags:
 *   name: GroupMembers
 *   description: 그룹 참여 관계 관리
 */

/**
 * @swagger
 * /group-members:
 *   get:
 *     summary: 전체 그룹 멤버 조회
 *     tags: [GroupMembers]
 *     responses:
 *       200:
 *         description: 전체 멤버 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupMember'
 */
router.get('/', async (req, res) => {
  try {
    const members = await GroupMember.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /group-members/{id}:
 *   get:
 *     summary: 단일 그룹 멤버 조회
 *     tags: [GroupMembers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 그룹 멤버 ID
 *     responses:
 *       200:
 *         description: 그룹 멤버 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMember'
 *       404:
 *         description: 멤버를 찾을 수 없음
 */
router.get('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /group-members:
 *   post:
 *     summary: 그룹 멤버 생성
 *     tags: [GroupMembers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMember'
 *     responses:
 *       201:
 *         description: 생성된 그룹 멤버
 *       500:
 *         description: 서버 오류
 */
router.post('/', async (req, res) => {
  try {
    const member = await GroupMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /group-members/{id}:
 *   put:
 *     summary: 그룹 멤버 수정
 *     tags: [GroupMembers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 그룹 멤버 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMember'
 *     responses:
 *       200:
 *         description: 수정된 그룹 멤버
 *       404:
 *         description: 멤버를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
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

/**
 * @swagger
 * /group-members/{id}:
 *   delete:
 *     summary: 그룹 멤버 삭제
 *     tags: [GroupMembers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 그룹 멤버 ID
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       404:
 *         description: 멤버를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
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