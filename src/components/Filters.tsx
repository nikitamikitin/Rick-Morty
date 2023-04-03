import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';
import ICharacterFilter from 'models/ICharacterFilter';
import ISpecies from 'models/ISpecies';
import statuses from 'constants/Statuses';
import genders from 'constants/Genderes';

type Props = {
  filterCardsCallback: (value: string, key: keyof ICharacterFilter) => void;
  filter: ICharacterFilter;
};
const styles = {
  root: {
    minWidth: 120,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: '16px ',
    padding: '16px',
  },
};

const Filters: FC<Props> = ({ filterCardsCallback, filter }) => {
  const handleChangeSpecies = (event: SelectChangeEvent) => {
    filterCardsCallback(event.target.value, 'species');
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    filterCardsCallback(event.target.value, 'status');
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    filterCardsCallback(event.target.value, 'gender');
  };

  return (
    <Box sx={styles.root}>
      <FormControl fullWidth>
        <InputLabel>Species</InputLabel>
        <Select
          label="Species"
          value={filter.species}
          onChange={handleChangeSpecies}
        >
          {Object.values(ISpecies).map((item: any) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={filter.status}
          onChange={handleChangeStatus}
        >
          {statuses.map(item => {
            return (
              <MenuItem key={item.title} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          label="Gender"
          value={filter.gender}
          onChange={handleChangeGender}
        >
          {genders.map(item => {
            return (
              <MenuItem key={item.title} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Filters;
