import { NewPatient, Gender, EntryType } from "./types";
import { z } from "zod";


export const toNewPatientEntry = (object: unknown): NewPatient => {
    return newPatientSchema.parse(object);
};

const entryTypeSchema = z.nativeEnum(EntryType);

export const baseEntrySchema = z.object({
    id: z.string(),
    date: z.string(),
    type: entryTypeSchema,
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
  });

 const healthCheckEntrySchema = baseEntrySchema.extend({
    type: z.literal(EntryType.HealthCheck),
    healthCheckRating: z.number()
  });

 const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: z.literal(EntryType.OccupationalHealthcare),
    employerName: z.string(),
    sickLeave: z.object({
      startDate: z.string(),
      endDate: z.string()
    }).optional()
  });

 const hospitalEntrySchema = baseEntrySchema.extend({
    type: z.literal(EntryType.Hospital),
    discharge: z.object({
      date: z.string(),
      criteria: z.string()
    })
  });

 export const entrySchema = z.discriminatedUnion("type", [
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema,
    healthCheckEntrySchema
  ]);

 export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


export const newPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.string().date(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(entrySchema).default([]) 
});
// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// }

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//     if (!date ||!isString(date) || !isDate(date)) {
//         throw new Error('Incorrect date: ' + date);
//     }
//     return date;
// };

// const parseName = (name: unknown): string => {
//     if (!name || !isString(name)) {
//         throw new Error('Incorrect name: ' + name);
//     }
//     return name;
// }
// const parseName = (name: unknown): string => {
//     return z.string().parse(name);
// }

// const isGender = (param: string): param is Gender => {
//     return Object.values(Gender).map(v => v.toString()).includes(param);
// }

// const parseGender = (gender: unknown): Gender => {
//     if (!gender ||!isString(gender)|| !isGender(gender)) {
//         throw new Error('Incorrect gender: ' + gender);
//     }
//     return gender;
// }

// const parseOccupation = (occupation: unknown): string => {
//     if (!isString(occupation)) {
//         throw new Error('Incorrect Occupation: ' + occupation);
//     }
//     return occupation;
// }

// const parseSsn = (ssn: unknown): string => {
//     if (!isString(ssn)) {
//         throw new Error('Incorrect SSN: ' + ssn);
//     }
//     return ssn;
// }

// export const toNewPatientEntry = (object: unknown): NewPatient => {
//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }
//     if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
//         const newEntry: NewPatient = {
//             name: parseName(object.name),
//             ssn: parseSsn(object.ssn),
//             dateOfBirth: parseDate(object.dateOfBirth),
//             gender: parseGender(object.gender),
//             occupation: parseOccupation(object.occupation)
//         }
//         return newEntry;
//     }
//     throw new Error('Incorrect data: some fields are missing');
// }