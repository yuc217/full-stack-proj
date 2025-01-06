import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
//   res.send('Fetching all diagnoses!');
  res.json(diagnosisService.getEntries());
});

router.get('/:code', (req, res) => {
  const diagnosis = diagnosisService.findByCode(req.params.code);
  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a disgnose!');
//   const newDiagnosis: Diagnosis = req.body;
//   data.push(newDiagnosis);
//   res.json(newDiagnosis);
});

export default router;