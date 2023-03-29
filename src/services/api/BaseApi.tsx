import axios from 'axios';
import { BaseURL } from 'constants/BaseURL';
import ICharacterFilter from 'models/ICharacterFilter';

const instance = axios.create({
  baseURL: BaseURL,
});

const BaseAPI = {
  async characters(page: number, filter: ICharacterFilter) {
    return await instance
      .get('character', {
        params: {
          page,
          ...filter,
        },
      })
      .then(r => r.data)
      .catch(() => {
        return { info: {}, results: [] };
      });
  },

  async episodes() {
    return await instance
      .get(`episode/${Array.from(new Array(52).keys())}`)
      .then(r => r.data);
  },
};

export default BaseAPI;
