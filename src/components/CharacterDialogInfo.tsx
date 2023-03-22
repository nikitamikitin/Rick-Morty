import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import CharacterModel from "../models/CharacterModel";

type Props = {
  characterInfo:CharacterModel
  open:boolean;
  onClose:()=>void
};

const CharacterDialogInfo: FC<Props> = ({ characterInfo,open,onClose}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" textAlign="center">
        {"Character Information"}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", gap: "30px" }}>
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
        <Box sx={{display:'flex',flexDirection:'column',gap:"20px"}}>
          <DialogContentText>Name: {characterInfo?.name}</DialogContentText>
        <DialogContentText>Gender: {characterInfo?.gender}</DialogContentText>
        <DialogContentText>Species: {characterInfo?.species}</DialogContentText>
        <DialogContentText>Status: {characterInfo?.status}</DialogContentText>  
        <DialogContentText>Created: {characterInfo?.created}</DialogContentText> 
        </Box>
      </DialogContent>
      <DialogActions> 
        <Button autoFocus onClick={()=>onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
export default CharacterDialogInfo;
