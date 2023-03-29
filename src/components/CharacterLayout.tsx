import {
  Box,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import CharacterInfo from 'models/CharacterInfo';
import CharacterModel from 'models/CharacterModel';
import ICharacterFilter from 'models/ICharacterFilter';
import BaseAPI from 'services/api/BaseApi';
import CharacterCard from 'components/CharacterCard';
import CharacterDialogInfo from 'components/CharacterDialogInfo';
import Filters from 'components/Filters';
import getDefaultFilter from 'constants/defaultFilter';
import SceletonRectangular from 'components/SceletonRectangular';
import getCharactersHook from 'services/hooks/getCharactersHook';

const CharacterLayout: FC = ({}) => {
  const [chosenCharacter, setchosenCharacter] = useState<CharacterModel>();
  const [page, setPage] = useState(1);
  //filter fields
  const [filter, setFilter] = useState<ICharacterFilter>(getDefaultFilter());
  const [characterInfo, characterList, loading] = getCharactersHook(
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

  const handleOpenDialogOpen = (chosenCharacter: CharacterModel) => {
    setchosenCharacter(chosenCharacter);
  };

  const handeCloseDialogOpen = () => {
    setchosenCharacter(undefined);
  };

  return (
    <>
      <Filters filter={filter} filterCardsCallback={filterCards}></Filters>

      <div>
        {chosenCharacter && (
          <CharacterDialogInfo
            characterInfo={chosenCharacter}
            open={!!chosenCharacter}
            onClose={handeCloseDialogOpen}
          ></CharacterDialogInfo>
        )}
      </div>
      <Grid marginTop={4}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          gap={4}
          padding={2}
        >
          {loading ? (
            <SceletonRectangular count={20}></SceletonRectangular>
          ) : (
            characterList?.map(item => {
              return (
                <CharacterCard
                  characterModel={item}
                  dialogOpen={handleOpenDialogOpen}
                  key={item.id}
                ></CharacterCard>
              );
            })
          )}
          {characterList?.length == 0 && (
            <Box>
              <Typography>
                No data with this filter values.Please Try Again
              </Typography>
            </Box>
          )}
        </Grid>
        {characterList?.length !== 0 && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            marginTop={4}
          >
            <Stack marginBottom={3}>
              <Pagination
                count={characterInfo?.pages}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CharacterLayout;
