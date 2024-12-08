import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { Person } from '../types/Person';

interface PersonDetailsModalProps {
  open: boolean;
  person: Person | null;
  onClose: () => void;
}

const PersonDetailsModal: React.FC<PersonDetailsModalProps> = ({ open, person, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="person-details-modal"
      aria-describedby="person-details-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {person && (
          <>
            <Typography id="person-details-modal" variant="h6" gutterBottom>
              {person.first_name} {person.last_name}
            </Typography>
            <Typography id="person-details-description" variant="body1" gutterBottom>
              <strong>Locations:</strong> {person.locations.map((loc) => loc.name).join(', ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Affiliations:</strong> {person.affiliations.map((aff) => aff.name).join(', ')}
            </Typography>
            {person.species && (
              <Typography variant="body1" gutterBottom>
                <strong>Species:</strong> {person.species}
              </Typography>
            )}
            {person.gender && (
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {person.gender}
              </Typography>
            )}
            {person.weapon && (
              <Typography variant="body1" gutterBottom>
                <strong>Weapon:</strong> {person.weapon}
              </Typography>
            )}
            {person.vehicle && (
              <Typography variant="body1" gutterBottom>
                <strong>Vehicle:</strong> {person.vehicle}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PersonDetailsModal;
