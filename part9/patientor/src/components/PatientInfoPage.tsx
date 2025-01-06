import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients';
import { Typography, Card, CardContent, Box } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetail';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const patientData = await patientService.getById(id);
          setPatient(patientData);
        } catch (e) {
          console.error('Failed to get patient info:', e);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'female':
        return <FemaleIcon />;
      case 'male':
        return <MaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5">{patient.name}</Typography>
            {getGenderIcon(patient.gender)}
          </Box>
          <Typography>SSN: {patient.ssn}</Typography>
          <Typography>Occupation: {patient.occupation}</Typography>
          <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
          
          <Box mt={2}>
            <Typography variant="h6">Entries</Typography>
            {patient?.entries?.length > 0 ? (
              patient.entries.map((entry, index) => (
                <Box key={index} mt={1}>
                  <EntryDetails key={entry.id || index} entry={entry} />
                </Box>
              ))
            ) : (
              <Typography>No entries</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientInfoPage;