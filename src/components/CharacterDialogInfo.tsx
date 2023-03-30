import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ICharacterModel from 'models/ICharacterModel';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
type Props = {
  characterInfo: ICharacterModel;
  open: boolean;
  onClose: () => void;
};

const CharacterDialogInfo: FC<Props> = ({ characterInfo, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <DialogTitle id="responsive-dialog-title" textAlign="center">
          {'Character Information'}
        </DialogTitle>
        <DialogActions>
          <IconButton autoFocus onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Box>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center' },
          gap: '10px',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 300,
            width: 300,
            maxHeight: { xs: 300, md: 300 },
            maxWidth: { xs: 300, md: 300 },
          }}
          alt={characterInfo?.name}
          src={characterInfo?.image}
        />
        <Box
          sx={{
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '5px' },
            alignItems: { xs: 'center', sm: 'start' },
            width: { xs: '100%' },
          }}
        >
          <DialogContentText>Name: {characterInfo?.name}</DialogContentText>
          <DialogContentText>Gender: {characterInfo?.gender}</DialogContentText>
          <DialogContentText>
            Species: {characterInfo?.species}
          </DialogContentText>
          <DialogContentText>Status: {characterInfo?.status}</DialogContentText>
          <DialogContentText>
            Created:{' '}
            {moment(characterInfo?.created).utc().format('YYYY-MM-DD hh:mm:ss')}
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default CharacterDialogInfo;
