import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import CharacterModel from "../models/CharacterModel";

type Props = {
  characterModel: CharacterModel;
  dialogOpen: (characterModel: CharacterModel) => void;
};

const CharacterCard: FC<Props> = ({ characterModel, dialogOpen }) => {
  const openDialog = (characterModel: CharacterModel) => {
    dialogOpen(characterModel);
  };

  return (
    <div>
      {characterModel && (
        <Card sx={{ width: 258 }}>
          <CardActionArea onClick={() => openDialog(characterModel)}>
            <CardMedia
              sx={{ height: 300 }}
              image={characterModel.image}
              title={characterModel.name}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Typography gutterBottom sx={{ height: "30px" }}>
                {characterModel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {characterModel.status}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
};

export default CharacterCard;

//modaldialog to layout level
