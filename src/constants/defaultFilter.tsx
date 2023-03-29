import ICharacterFilter from 'models/ICharacterFilter';

const getDefaultFilter = (): ICharacterFilter => {
  return { species: '', status: '', gender: '' };
};
export default getDefaultFilter;
