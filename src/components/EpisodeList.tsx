import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IlSData from 'models/IlSData';

type Props = {
  data: IlSData[];
  changeWatchedFlag: (item: IlSData) => void;
  removeEpisodeFromList: (item: IlSData) => void;
};

const styles = {
  root: { width: '100%', display: 'flex', justifyContent: 'center' },
  list: { width: '100%', bgcolor: 'background.paper' },
};

const EpisodeList: FC<Props> = ({
  data,
  changeWatchedFlag,
  removeEpisodeFromList,
}) => {
  return (
    <Box sx={styles.root}>
      <List sx={styles.list}>
        {data.map((value, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="deleteIcon"
                  onClick={() => removeEpisodeFromList(value)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton dense onClick={() => changeWatchedFlag(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    checked={value.watched}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={value.chosenEpisode}
                  sx={{
                    textDecoration: value.watched ? 'line-through' : 'none',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
export default EpisodeList;
