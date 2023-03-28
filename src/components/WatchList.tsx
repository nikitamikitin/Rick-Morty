import { Autocomplete, Box, Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import EpisodeModel from '../models/EpisodeModel';
import BaseAPI from '../services/api/BaseApi';
import EpisodeList from './EpisodeList';

export interface LSData {
  chosenEpisode: string;
  watched: boolean;
}

const getLSEpisodes = (): LSData[] => {
  const localStorageData = localStorage.getItem('episodes');
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
    const lsEpisodes = getLSEpisodes();
    BaseAPI.episodes().then((r: EpisodeModel[]) => {
      const episodesNames = r.map(item => `${item.episode}_${item.name}`);
      const formattedEpisodes = episodesNames.reduce((res: any, item: any) => {
        const match = lsEpisodes.find(
          (item2: any) => item2.chosenEpisode === item
        );
        if (!match) {
          res.push(item);
        }
        return res;
      }, []);
      setListOfEpisodeNames(formattedEpisodes);
    });
    setLSEpisodes(lsEpisodes);
  }, []);
  const addToLocalStorage = () => {
    const episodes: LSData[] = getLSEpisodes();
    const isChosenEpisodeInLS: LSData | undefined = episodes.find(
      item => item.chosenEpisode === chosenEpisode
    );
    if (!isChosenEpisodeInLS) {
      localStorage.setItem(
        'episodes',
        JSON.stringify([...episodes, { chosenEpisode, watched: false }])
      );
      const formattedEpisodes = listOfEpisodeNames.filter(
        (item: any) => item !== chosenEpisode
      );
      setListOfEpisodeNames(formattedEpisodes);
      setLSEpisodes(getLSEpisodes());
    }
    setChosenEpisode('');
  };
  const handleRemoveEpisode = (item: LSData) => {
    const episodes: LSData[] = getLSEpisodes();
    const episodesNew = episodes.filter(
      episode => episode.chosenEpisode !== item.chosenEpisode
    );
    localStorage.setItem('episodes', JSON.stringify([...episodesNew]));

    setListOfEpisodeNames([item.chosenEpisode, ...listOfEpisodeNames].sort());
    setLSEpisodes(getLSEpisodes());
  };

  const handleChangeFlagStatus = (item: LSData) => {
    const episodes: LSData[] = getLSEpisodes();
    const episodeIndex = getLSEpisodes().findIndex(
      episode => episode.chosenEpisode == item.chosenEpisode
    );

    episodes[episodeIndex] = {
      chosenEpisode: item.chosenEpisode,
      watched: !item.watched,
    };
    localStorage.setItem('episodes', JSON.stringify([...episodes]));
    setLSEpisodes(getLSEpisodes());
  };
  return (
    <Box
      sx={{
        width: '100%',
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          width: { xs: '100%', sm: 400 },
          gap: '16px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              gap: '15px',
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[...listOfEpisodeNames, '']}
              getOptionLabel={option => option}
              value={chosenEpisode}
              filterSelectedOptions
              sx={{ width: '100%' }}
              onChange={(event: any, newValue: string | null) => {
                handleChoseEpisode(event, newValue);
              }}
              renderInput={params => <TextField {...params} label="Episode" />}
            />
            <Button
              sx={{ width: '60%' }}
              disabled={!chosenEpisode}
              variant="contained"
              onClick={() => addToLocalStorage()}
            >
              Add Episode
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <EpisodeList
            data={lsEpisodes}
            changeWatchedFlag={handleChangeFlagStatus}
            removeEpisodeFromList={handleRemoveEpisode}
          ></EpisodeList>
        </Box>
      </Box>
    </Box>
  );
};
export default WatchList;
