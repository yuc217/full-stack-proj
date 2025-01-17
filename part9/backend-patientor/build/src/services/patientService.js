"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default; // as Patient[];
const getEntries = () => {
    return patients;
};
const findById = (id) => {
    const entry = patients.find(p => p.id === id);
    return entry;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (newEntry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, newEntry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById
};
