import { Entry, EntryType, Diagnosis } from '../types';
import { Typography, Card, CardContent, Box,List,ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import diagnosisService from '../services/diagnoses';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
      const fetchDiagnoses = async () => {
          try {
            const diagnosisData = await diagnosisService.getAll();
            setDiagnoses(diagnosisData);
          } catch (e) {
            console.error('Failed to get diagnosis info:', e);
          }
        
      };
      void fetchDiagnoses();
    }, []);

    const assertNever = (value: Entry): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    const moreSpecifics = (entry: Entry) => {
      switch (entry.type) {
        case EntryType.Hospital:
          return (
            <Box mt={1}>
              <Typography>
                Discharge date: {entry.discharge.date}
              </Typography>
              <Typography>
                Criteria: {entry.discharge.criteria}
              </Typography>
            </Box>
          );
        case EntryType.OccupationalHealthcare:
          return (
            <Box mt={1}>
              <Typography>
                Employer: {entry.employerName}
              </Typography>
              {entry.sickLeave && (
                <Typography>
                  Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                </Typography>
              )}
            </Box>
          );
        case EntryType.HealthCheck:
          return (
            <Typography>
              Health Rating: {entry.healthCheckRating}
            </Typography>
          );
        default:
            return assertNever(entry);
      }
    };
  
    return (
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">{entry.date}</Typography>
          </Box>
          <Typography sx={{ fontStyle: 'italic' }}>
            {entry.description}
          </Typography>
        
          {entry.diagnosisCodes && (
            <List dense>
              {entry.diagnosisCodes.map(code => (
                <ListItem key={code}>
                  • {code}: {diagnoses.find(d => d.code === code)?.name}
                </ListItem>
              ))}
            </List>
          )}
          {moreSpecifics(entry)}
            <Typography>
            Diagnosed by: {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    );
  };

export default EntryDetails;