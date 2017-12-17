import config from 'config';
import { defaultOptions, request } from 'Utils/api';

export const getNamecards_Q_username = (token, username) => {
  const payload = {
    ...defaultOptions('GET', { token })
  };

  const uri = `${config.api.url}/namecards?username=${username}`;
  return request(uri, payload);
};
