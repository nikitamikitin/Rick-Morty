import { FC } from "react";
import CharacterCard from "./CharacterCard";
import { Grid, Pagination, Stack } from "@mui/material";
import ICharacterModel from "models/ICharacterModel";
import ICharacterInfo from "models/ICharacterInfo";

type Props={
    characterList: ICharacterModel[]
    characterInfo: ICharacterInfo | undefined
    page:number
    handleOpenDialogOpen: (chosenCharacter: ICharacterModel)=>void
    handleChange: (event: React.ChangeEvent<unknown>, value: number)=>void
}

const CharacterList:FC <Props>=({characterList,characterInfo,page,handleOpenDialogOpen,handleChange})=>{
    return (
        <>
          {characterList?.map(item => {
            return (
              <CharacterCard
                characterModel={item}
                dialogOpen={()=>handleOpenDialogOpen(item)}
                key={item.id}
              ></CharacterCard>
            );
          })}
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
        </>
      );
}
export default CharacterList