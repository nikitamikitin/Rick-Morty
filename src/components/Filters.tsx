import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";
import ICharacterFilter from "../models/ICharacterFilter";

enum ISpecies {
  'All'="All",
  'human' = 'Human',
  'alien' = 'Alien',
  'humanoid' = 'Humanoid',
  'poopybutthole' = 'Poopybutthole',
  'mythologicalCreature' = 'Mythological creature',
  'animal' = 'Animal',
  'robot' = 'Robot',
  'cronenberg' = 'Cronenberg',
  'disease' = 'Disease',
  'unknown' = 'unknown',
}



const optionsStatus=[{title:'All',value:'All'},{title:'Alive',value:'Alive'},{title:'Dead',value:'Dead'},{title:'Unknown',value:'unknown'}]

const optionsGenders=[{title:'All',value:'All'},{title:'Female',value:'female'},{title:'Male',value:'male'},{title:'Genderless',value:'genderless'},{title:'Unknown',value:'unknown'}]

type Props={
  filterCardsCallback:(type:string,value:string)=>void
  filter: ICharacterFilter
}


const Filters: FC<Props> = ({filterCardsCallback,filter}) => {
  const handleChangeSpecies = (event: SelectChangeEvent) => {
    filterCardsCallback(event.target.value,"species")
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    filterCardsCallback(event.target.value,"status")
  };

  const handleChangeGender = (event: SelectChangeEvent) => {  
    filterCardsCallback(event.target.value,"gender")
  };

  return (
    <Box sx={{ minWidth: 120 ,display: 'flex',flexDirection: { xs: 'column',sm:'row'},gap:'50px ',margin:'30px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Species</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Species"
          value={filter.species}
          onChange={handleChangeSpecies}
        >
        {Object.values(ISpecies).map((item: any )=>{
            return <MenuItem  key={item} value={item}>{item}</MenuItem>
        })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          value={filter.status}
          onChange={handleChangeStatus}
        >
        {optionsStatus.map((item)=>{
            return <MenuItem  key={item.title} value={item.value}>{item.title}</MenuItem>
        })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Gender"
          value={filter.gender}
          onChange={handleChangeGender}
        >
         {optionsGenders.map((item)=>{
            return <MenuItem  key={item.title} value={item.value}>{item.title}</MenuItem>
        })}
        </Select>
      </FormControl>

    </Box>
  );
};
export default Filters;
