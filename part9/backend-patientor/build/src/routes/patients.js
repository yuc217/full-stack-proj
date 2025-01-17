"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    //   res.send('Fetching all patients!');
    res.json(patientService_1.default.getNonSensitiveEntries());
});
const newPatientParse = (req, _res, next) => {
    try {
        utils_1.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', newPatientParse, (req, res) => {
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
    const addedPatient = patientService_1.default.addPatient(req.body);
    res.json(addedPatient);
});
router.use(errorMiddleware);
exports.default = router;
