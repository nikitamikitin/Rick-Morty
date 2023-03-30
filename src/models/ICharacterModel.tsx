interface ICharacterModel{
  id: number;
  gender: string;
  image: string;
  created: string;
  name: string;
  species: string;
  status: string;
  type: string;
  url: string;
  episode: [];
  location: [];
  origin: [];
};

export default ICharacterModel;
