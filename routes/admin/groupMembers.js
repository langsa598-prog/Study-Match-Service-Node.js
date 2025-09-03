const express = require('express');
const router = express.Router();
const GroupMember = require('../../models/GroupMember');

/**
 * @swagger
 * tags:
 *   name: AdminGroupMembers
 *   description: 관리자용 그룹 멤버 API
 */

router.get('/', async (req, res) => {
  try { res.json(await GroupMember.findAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json(member);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await GroupMember.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    await member.update(req.body);
    res.json(member);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const member = await GroupMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    await member.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;