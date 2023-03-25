import { Autocomplete, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EpisodeModel from "../models/EpisodeModel";
import BaseAPI from "../services/api/BaseApi";
import EpisodeList from "./EpisodeList";

export interface LSData {
  chosenEpisode: string;
  watched: boolean;
}

const getLSEpisodes = (): LSData[] => {
  const localStorageData = localStorage.getItem("episodes");
  return localStorageData ? JSON.parse(localStorageData) : [];
};

const WatchList = () => {
  const [listOfEpisodeNames, setListOfEpisodeNames] = useState<string[]>([]);
  const [chosenEpisode, setChosenEpisode] = useState<string | null>(null);
  const [lsEpisodes, setLSEpisodes] = useState<LSData[]>([]);

  const handleChoseEpisode = (event: any, newValue: string | null) => {
    setChosenEpisode(newValue);
  };

  useEffect(() => {
    BaseAPI.episodes().then((r: EpisodeModel[]) => {
      setListOfEpisodeNames(r.map((item) => `${item.episode}_${item.name}`));
    });
    setLSEpisodes(getLSEpisodes());
  }, []);

  const addToLocalStorage = () => {
    const episodes: LSData[] = getLSEpisodes();
    const isChosenEpisodeInLS: LSData | undefined = episodes.find(
      (item) => item.chosenEpisode === chosenEpisode
    );
    if (!isChosenEpisodeInLS) {
      localStorage.setItem(
        "episodes",
        JSON.stringify([...episodes, { chosenEpisode, watched: false }])
      );
      setLSEpisodes(getLSEpisodes());
    
    } else {
      
    }
  };
  const handleRemoveEpisode=(item:LSData)=>{
    const episodes: LSData[] = getLSEpisodes();
    const episodesNew = episodes.filter(
      (episode) => episode.chosenEpisode !== item.chosenEpisode
    );
    localStorage.setItem("episodes", JSON.stringify([...episodesNew]));
    setLSEpisodes(getLSEpisodes());
  }

  const handleChangeFlagStatus = (item: LSData) => {
    const episodes: LSData[] = getLSEpisodes();
    const episodeIndex = getLSEpisodes().findIndex(
      (episode) => episode.chosenEpisode == item.chosenEpisode
    );

    episodes[episodeIndex] = {
      chosenEpisode: item.chosenEpisode,
      watched: !item.watched,
    };
    localStorage.setItem("episodes", JSON.stringify([...episodes]));
    setLSEpisodes(getLSEpisodes());
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          gap: "15px",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={listOfEpisodeNames}
          sx={{ width: 300 }}
          onChange={(event: any, newValue: string | null) => {
            handleChoseEpisode(event, newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Episode" />}
        />
        <Button
          disabled={!chosenEpisode}
          variant="contained"
          onClick={() => addToLocalStorage()}
        >
          Add Episode
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          gap: "15px",
        }}
      >
        <EpisodeList
          data={lsEpisodes}
          changeWatchedFlag={handleChangeFlagStatus}
          removeEpisodeFromList={handleRemoveEpisode}
        ></EpisodeList>
      </Box>
    </>
  );
};
export default WatchList;
