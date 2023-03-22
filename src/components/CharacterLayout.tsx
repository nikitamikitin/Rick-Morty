import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CharacterInfo from "../models/CharacterInfo";
import CharacterModel from "../models/CharacterModel";
import ICharacterFilter from "../models/ICharacterFilter";
import BaseAPI from "../services/api/BaseApi";
import CharacterCard from "./CharacterCard";
import CharacterDialogInfo from "./CharacterDialogInfo";
import Filters from "./Filters";

const CharacterLayout:  FC = ({}) => {
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | undefined>(
    undefined
  );
  const [characterList, setcharacterList] = useState<
    CharacterModel[] | undefined
  >();
  const [chosenCharacter, setchosenCharacter] = useState<
    CharacterModel | undefined
  >(undefined);
  const [page, setPage] = useState(1);
  

   //filter fields
   const [filter, setFilter] = useState<ICharacterFilter>(getDefaultFilter());


  const filterCards=(value: string, key: string)=>{
    setFilter({ ...filter, [key]: value });
    setPage(1)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenDialogOpen = (
    chosenCharacter: CharacterModel
  ) => {
    setchosenCharacter(chosenCharacter);
  };

  const handeCloseDialogOpen = () => {
    setchosenCharacter(undefined);
  };


  useEffect(() => {
    BaseAPI.characters(page,filter).then((r) => {
      setCharacterInfo(r.info);
      setcharacterList(r.results);
    });
  }, [page,filter]);

  return (
    <>
      <Filters filter={filter} filterCardsCallback={filterCards}></Filters>

      <div>
        {chosenCharacter  && (
          <CharacterDialogInfo
            characterInfo={chosenCharacter}
            open={!!chosenCharacter}
            onClose={handeCloseDialogOpen}
          ></CharacterDialogInfo>
        )}
      </div>
      <Grid marginTop={4}>
        <Grid container justifyContent="center" alignItems="center" gap={4}>
          {characterList?.map((item) => {
            return (
              <CharacterCard
                characterModel={item}
                dialogOpen={handleOpenDialogOpen}
                key={item.id}
              ></CharacterCard>
            );
          })}
        </Grid>
        {characterInfo && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            marginTop={4}
          >
            <Stack spacing={1}>
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
  return {species:"",status:"",gender:""}
}