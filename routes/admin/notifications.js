const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');

/**
 * @swagger
 * tags:
 *   name: AdminNotifications
 *   description: 관리자용 알림 API
 */

router.get('/', async (req, res) => {
  try { res.json(await Notification.findAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Not found' });
    res.json(notification);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await Notification.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Not found' });
    await notification.update(req.body);
    res.json(notification);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Not found' });
    await notification.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;