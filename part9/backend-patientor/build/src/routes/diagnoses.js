"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    //   res.send('Fetching all diagnoses!');
    res.json(diagnosisService_1.default.getEntries());
});
router.get('/:code', (req, res) => {
    const diagnosis = diagnosisService_1.default.findByCode(req.params.code);
    if (diagnosis) {
        res.send(diagnosis);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (_req, res) => {
    res.send('Saving a disgnose!');
    //   const newDiagnosis: Diagnosis = req.body;
    //   data.push(newDiagnosis);
    //   res.json(newDiagnosis);
});
exports.default = router;
