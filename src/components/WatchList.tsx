import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import IEpisodeModel from 'models/IEpisodeModel';
import BaseAPI from 'services/api/BaseApi';
import EpisodeList from 'components/EpisodeList';
import IlSData from 'models/IlSData';
import getLSEpisodes from 'tools/getLSEpisodes';

const styles = {
  root: {
    width: '100%',
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
  },

  autocomplete: { width: '100%' },
  addBtn: { width: '60%' },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  containerAutoComplete: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: '15px',
  },
};

const WatchList = () => {
  const [listOfEpisodeNames, setListOfEpisodeNames] = useState<string[]>([]);
  const [chosenEpisode, setChosenEpisode] = useState<string | null>(null);
  const [lsEpisodes, setLSEpisodes] = useState<IlSData[]>([]);

  const handleChoseEpisode = (event: any, newValue: string | null) => {
    setChosenEpisode(newValue);
  };

  useEffect(() => {
    const lsEpisodes = getLSEpisodes();
    BaseAPI.episodes().then((r: IEpisodeModel[]) => {
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
    const episodes: IlSData[] = getLSEpisodes();
    const isChosenEpisodeInLS: IlSData | undefined = episodes.find(
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
  const handleRemoveEpisode = (item: IlSData) => {
    const episodes: IlSData[] = getLSEpisodes();
    const episodesNew = episodes.filter(
      episode => episode.chosenEpisode !== item.chosenEpisode
    );
    localStorage.setItem('episodes', JSON.stringify([...episodesNew]));

    setListOfEpisodeNames([item.chosenEpisode, ...listOfEpisodeNames].sort());
    setLSEpisodes(getLSEpisodes());
  };

  const handleChangeFlagStatus = (item: IlSData) => {
    const episodes: IlSData[] = getLSEpisodes();
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
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          width: { xs: '100%', sm: 400 },
          gap: '16px',
        }}
      >
        <Box sx={styles.container}>
          <Box sx={styles.containerAutoComplete}>
            <Autocomplete
              disablePortal
              options={[...listOfEpisodeNames, '']}
              getOptionLabel={option => option}
              value={chosenEpisode}
              filterSelectedOptions
              sx={styles.autocomplete}
              onChange={(event: any, newValue: string | null) => {
                handleChoseEpisode(event, newValue);
              }}
              renderInput={params => <TextField {...params} label="Episode" />}
            />
            <Button
              sx={styles.addBtn}
              disabled={!chosenEpisode}
              variant="contained"
              onClick={() => addToLocalStorage()}
            >
              Add Episode
            </Button>
          </Box>
        </Box>
        <Box sx={styles.container}>
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
