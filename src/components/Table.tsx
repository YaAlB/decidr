import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Person } from '../types/Person';
import PersonDetailsModal from './PersonDetailsModal'; // Import the modal component

interface TableProps {
  people: Person[];
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
  sortBy: string;
  order: 'asc' | 'desc';
}

const DataTable: React.FC<TableProps> = ({ people, onSort, sortBy, order }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleRowClick = (person: Person) => {
    setSelectedPerson(person); // Set the selected person to display in the modal
  };

  const handleSort = (column: string) => {
    const newOrder = sortBy === column && order === 'asc' ? 'desc' : 'asc';
    onSort(column, newOrder);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null); // Clear the selected person when modal is closed
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('first_name')} sx={{ cursor: 'pointer' }}>
                First Name {sortBy === 'first_name' && (order === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('last_name')} sx={{ cursor: 'pointer' }}>
                Last Name {sortBy === 'last_name' && (order === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('locations')} sx={{ cursor: 'pointer' }}>
                Locations {sortBy === 'locations' && (order === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('affiliations')} sx={{ cursor: 'pointer' }}>
                Affiliations {sortBy === 'affiliations' && (order === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('weapon')} sx={{ cursor: 'pointer' }}>
                Weapon {sortBy === 'weapon' && (order === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('vehicle')} sx={{ cursor: 'pointer' }}>
                Vehicle {sortBy === 'vehicle' && (order === 'asc' ? '↑' : '↓')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow
                key={person.id}
                onClick={() => handleRowClick(person)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                <TableCell>{person.first_name}</TableCell>
                <TableCell>{person.last_name}</TableCell>
                <TableCell>
                  {person.locations.map((location) => location.name).join(', ')}
                </TableCell>
                <TableCell>
                  {person.affiliations.map((affiliation) => affiliation.name).join(', ')}
                </TableCell>
                <TableCell>{person.weapon || '-'}</TableCell>
                <TableCell>{person.vehicle || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to display person details */}
      {selectedPerson && (
        <PersonDetailsModal
          open={!!selectedPerson}
          person={selectedPerson}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default DataTable;
