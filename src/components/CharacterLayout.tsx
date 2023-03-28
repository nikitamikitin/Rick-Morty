import { Box, Grid, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CharacterInfo from "../models/CharacterInfo";
import CharacterModel from "../models/CharacterModel";
import ICharacterFilter from "../models/ICharacterFilter";
import BaseAPI from "../services/api/BaseApi";
import CharacterCard from "./CharacterCard";
import CharacterDialogInfo from "./CharacterDialogInfo";
import Filters from "./Filters";

const CharacterLayout: FC = ({}) => {
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | undefined>();
  //Вместо undefined попробуй использовать пустой массив, все проверки делай на длинну массива
  const [characterList, setcharacterList] = useState<CharacterModel[]>([]);
  const [chosenCharacter, setchosenCharacter] = useState<CharacterModel | undefined>();
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  //filter fields
  const [filter, setFilter] = useState<ICharacterFilter>(getDefaultFilter());

  const filterCards = (value: string, key: keyof ICharacterFilter) => {
    const formattedValue = value === 'All' ? '' : value
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

  useEffect(() => {
    setLoading(true)
    BaseAPI.characters(page, filter).then((r) => {
      setCharacterInfo(r.info);
      setcharacterList(r.results);
    }).finally(() => setLoading(false))
  }, [page, filter]);  

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
          {/*Вынести в отдельную компоненту*/}
          {loading ?
              (Array.from(Array(20)).map((item,index)=>{return <Skeleton sx={{width :{xs:'100%',sm:258}}}height={360}  key={index} variant="rectangular"/>})):(characterList?.map((item) => {
            return (
              <CharacterCard
                characterModel={item}
                dialogOpen={handleOpenDialogOpen}
                key={item.id}
              ></CharacterCard>
            );
          })) }
          {!characterList?.length && <Box><Typography>No data with this filter values.Please Try Again</Typography></Box>}
        </Grid>
        {characterInfo && (
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

function getDefaultFilter(): ICharacterFilter {
  return { species: "", status: "", gender: "" };
}
