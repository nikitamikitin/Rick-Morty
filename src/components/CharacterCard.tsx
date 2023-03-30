import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import ICharacterModel from 'models/ICharacterModel';

type Props = {
  characterModel: ICharacterModel;
  dialogOpen: (characterModel: ICharacterModel) => void;
};

const CharacterCard: FC<Props> = ({ characterModel, dialogOpen }) => {
  // const openDialog = (characterModel: ICharacterModel) => {
  //   dialogOpen(characterModel);
  // };


  return (
    <Box sx={{ width: { xs: '100%', sm: 258 } }}>
      {characterModel && (
        <Card sx={{ width: { xs: '100%', sm: 258 } }}>
          <CardActionArea onClick={() => dialogOpen(characterModel)}>
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
