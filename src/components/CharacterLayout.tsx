import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ICharacterModel from 'models/ICharacterModel';
import ICharacterFilter from 'models/ICharacterFilter';
import CharacterCard from 'components/CharacterCard';
import CharacterDialogInfo from 'components/CharacterDialogInfo';
import Filters from 'components/Filters';
import getDefaultFilter from 'constants/defaultFilter';
import SkeletonRectangular from 'components/SceletonRectangular';
import useGetCharacters from 'services/hooks/useGetCharacters';
import CharacterList from './CharacterList';

const CharacterLayout = () => {
  const [chosenCharacter, setChosenCharacter] = useState<ICharacterModel>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ICharacterFilter>(getDefaultFilter());
  const { characterInfo, characterList, loading } = useGetCharacters(
    page,
    filter
  );

  const filterCards = (value: string, key: keyof ICharacterFilter) => {
    const formattedValue = value === 'All' ? '' : value;
    if (filter[key] !== formattedValue) {
      setFilter({ ...filter, [key]: formattedValue });
      setPage(1);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenDialogOpen = (chosenCharacter: ICharacterModel) => {
    setChosenCharacter(chosenCharacter);
  };

  const handeCloseDialogOpen = () => {
    setChosenCharacter(undefined);
  };

  const getTableData = (
    loading: boolean,
    characterList: ICharacterModel[]
  ): JSX.Element => {
    if (loading) {
      return <SkeletonRectangular count={20} />;
    }
    if (characterList?.length == 0) {
      return (
        <Box>
          <Typography>
            {' '}
            No data with this filter values.Please Try Again
          </Typography>
        </Box>
      );
    }
    return <CharacterList characterList={characterList} characterInfo={characterInfo}  page={page} handleChange={handleChange} handleOpenDialogOpen={handleOpenDialogOpen}></CharacterList>

  };

  return (
    <>
      <Filters filter={filter} filterCardsCallback={filterCards}></Filters>
      {chosenCharacter && (
        <CharacterDialogInfo
          characterInfo={chosenCharacter}
          open={!!chosenCharacter}
          onClose={handeCloseDialogOpen}
        />
      )}
      <Grid marginTop={4}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          gap={4}
          padding={2}
        >
          {getTableData(loading, characterList)}
        </Grid>
      </Grid>
    </>
  );
};

export default CharacterLayout;
