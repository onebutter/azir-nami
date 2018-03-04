import config from 'config';
import { defaultOptions, request } from 'Utils/api';

export const getNamecards_Q_username = (token, username) => {
  const payload = {
    ...defaultOptions('GET', { token })
  };

  const uri = `${config.api.url}/namecards?username=${username}`;
  return request(uri, payload);
};

export const getNamecards_Q_userid = (token, userid) => {
  const payload = {
    ...defaultOptions('GET', { token })
  };

  const uri = `${config.api.url}/namecards?userid=${userid}`;
  return request(uri, payload);
};

export const postNamecards = (token, body) => {
  const payload = {
    ...defaultOptions('POST', { token }),
    body: JSON.stringify(body)
  };

  const uri = `${config.api.url}/namecards`;
  return request(uri, payload);
};
