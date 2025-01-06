import data from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = data;// as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const findByCode = (code: string): Diagnosis | undefined => {
  const entry = diagnoses.find(p => p.code === code);
  return entry;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
  findByCode
};