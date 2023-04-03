import IlSData from 'models/IlSData';

const getLSEpisodes = (): IlSData[] => {
  const localStorageData = localStorage.getItem('episodes');
  return localStorageData ? JSON.parse(localStorageData) : [];
};

export default getLSEpisodes;
