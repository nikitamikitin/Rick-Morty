import CharacterInfo from 'models/CharacterInfo';
import CharacterModel from 'models/CharacterModel';
import ICharacterFilter from 'models/ICharacterFilter';
import { useEffect, useState } from 'react';
import BaseAPI from 'services/api/BaseApi';

const getCharactersHook = (page: number, filter: ICharacterFilter) => {
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo>();
  const [characterList, setcharacterList] = useState<CharacterModel[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    BaseAPI.characters(page, filter)
      .then(r => {
        setCharacterInfo(r.info);
        setcharacterList(r.results);
      })
      .finally(() => setLoading(false));
  }, [page, filter]);

  return [characterInfo, characterList, loading] as const;
};

export default getCharactersHook;
