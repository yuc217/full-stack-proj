import express from 'express';
import patientService from '../services/patientService';
import {  newPatientSchema } from '../utils';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { NewPatient, Patient} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
//   res.send('Fetching all patients!');
  res.json(patientService.getNonSensitiveEntries());
});

const newPatientParse = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParse, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
//   res.send('Saving a patient!');
// const { name, occupation, gender, dateOfBirth, ssn } = req.body;
// try{
//     const newEntry = toNewPatientEntry(req.body);
//     const newPatient = patientService.addPatient(newEntry);
//     res.json(newPatient);
//     console.log("adding new patient...");
// }catch(error: unknown){
//   if (error instanceof z.ZodError) {
//     res.status(400).send({ error: error.issues });
//   } else {
//     res.status(400).send({ error: 'unknown error' });
//   }
// }
const addedPatient = patientService.addPatient(req.body);
res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;