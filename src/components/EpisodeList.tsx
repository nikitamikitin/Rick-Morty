import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { LSData } from "./WatchList";

type Props = {
    data: LSData[]
    changeWatchedFlag: (item :LSData)=>void
    removeEpisodeFromList: (item :LSData)=>void
}

const EpisodeList: FC<Props> = ({data,changeWatchedFlag,removeEpisodeFromList}) => {
  
  return (
    <Box sx={{width: "100%",display: "flex",
    justifyContent: "center"}}>
    <List sx={{width:'100%', bgcolor: "background.paper" }}>
      {data.map((value,index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="deleteIcon" onClick={()=>removeEpisodeFromList(value)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense  onClick={()=>changeWatchedFlag(value)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  checked={value.watched}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.chosenEpisode} sx={{textDecoration: value.watched ? 'line-through': 'none'}}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </Box>
  );
};
export default EpisodeList;
