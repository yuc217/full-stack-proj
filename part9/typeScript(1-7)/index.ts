import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || !daily_exercises.every(e => typeof e === 'number') || typeof target !== 'number') {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = calculateExercises(daily_exercises, target);
  res.json(result);

});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters"  });
  }
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});