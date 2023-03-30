import ICharacterInfo from 'models/ICharacterInfo';
import ICharacterModel from 'models/ICharacterModel';
import ICharacterFilter from 'models/ICharacterFilter';
import { useEffect, useState } from 'react';
import BaseAPI from 'services/api/BaseApi';

const useGetCharacters = (page: number, filter: ICharacterFilter) => {
  const [characterInfo, setCharacterInfo] = useState<ICharacterInfo>();
  const [characterList, setCharacterList] = useState<ICharacterModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    BaseAPI.characters(page, filter)
      .then(r => {
        setCharacterInfo(r.info);
        setCharacterList(r.results);
      })
      .finally(() => setLoading(false));
  }, [page, filter]);

  return { characterInfo, characterList, loading };
};

export default useGetCharacters;
