const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  try { res.json(await Attendance.findAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Not found' });
    res.json(attendance);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await Attendance.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Not found' });
    await attendance.update(req.body);
    res.json(attendance);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Not found' });
    await attendance.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;