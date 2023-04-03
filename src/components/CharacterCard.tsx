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


const styles={
  root:{
    width: { xs: '100%', sm: 258 }
  },
  boxContent:{
    height: { sm: '100%' }, 
    width: '100%' 
  },
  cardContent:{
    display: 'flex', flexDirection: 'column', gap: '10px' 
  },
  typName:{
    height: '30px' 
  },

}

const CharacterCard: FC<Props> = ({ characterModel, dialogOpen }) => {

  return (
    <Box sx={styles.root}>
      {characterModel && (
        <Card sx={styles.root}>
          <CardActionArea onClick={() => dialogOpen(characterModel)}>
            <Box
              component="img"
              sx={styles.boxContent}
              src={characterModel.image}
              title={characterModel.name}
            />
            <CardContent
              sx={styles.cardContent}
            >
              <Typography gutterBottom sx={styles.typName}>
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

