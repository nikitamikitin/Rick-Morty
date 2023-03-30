import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import CharacterModel from '../models/CharacterModel';

type Props = {
  characterModel: CharacterModel;
  dialogOpen: (characterModel: CharacterModel) => void;
};

const CharacterCard: FC<Props> = ({ characterModel, dialogOpen }) => {
  const openDialog = (characterModel: CharacterModel) => {
    dialogOpen(characterModel);
  };
  console.log(123)
  return (
    <Box sx={{ width: { xs: '100%', sm: 258 } }}>
      {characterModel && (
        <Card sx={{ width: { xs: '100%', sm: 258 } }}>
          <CardActionArea onClick={() => openDialog(characterModel)}>
            <Box
              component="img"
              sx={{ height: { sm: '100%' }, width: '100%' }}
              src={characterModel.image}
              title={characterModel.name}
            />
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <Typography gutterBottom sx={{ height: '30px' }}>
                {characterModel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {characterModel.status}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Box>
  );
};

export default CharacterCard;

//modaldialog to layout level
