"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPatientSchema = exports.assertNever = exports.entrySchema = exports.baseEntrySchema = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const toNewPatientEntry = (object) => {
    return exports.newPatientSchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
const entryTypeSchema = zod_1.z.nativeEnum(types_1.EntryType);
exports.baseEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    date: zod_1.z.string(),
    type: entryTypeSchema,
    specialist: zod_1.z.string(),
    description: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional()
});
const healthCheckEntrySchema = exports.baseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.HealthCheck),
    healthCheckRating: zod_1.z.number()
});
const occupationalHealthcareEntrySchema = exports.baseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.OccupationalHealthcare),
    employerName: zod_1.z.string(),
    sickLeave: zod_1.z.object({
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string()
    }).optional()
});
const hospitalEntrySchema = exports.baseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.Hospital),
    discharge: zod_1.z.object({
        date: zod_1.z.string(),
        criteria: zod_1.z.string()
    })
});
exports.entrySchema = zod_1.z.discriminatedUnion("type", [
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema,
    healthCheckEntrySchema
]);
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    ssn: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.array(exports.entrySchema).default([])
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
