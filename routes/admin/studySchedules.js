const express = require('express');
const router = express.Router();
const StudySchedule = require('../../models/StudySchedule');

/**
 * @swagger
 * tags:
 *   name: AdminStudySchedules
 *   description: 관리자용 스터디 일정 API
 */

router.get('/', async (req, res) => {
  try { res.json(await StudySchedule.findAll()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const schedule = await StudySchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    res.json(schedule);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await StudySchedule.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const schedule = await StudySchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    await schedule.update(req.body);
    res.json(schedule);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const schedule = await StudySchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    await schedule.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;