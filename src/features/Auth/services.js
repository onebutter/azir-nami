import config from 'config';
import { defaultOptions, request } from 'Utils/api';

export const postLoginAPI = credentials => {
  const payload = {
    ...defaultOptions('POST'),
    body: JSON.stringify(credentials)
  };

  const uri = `${config.api.url}/auth/login`;
  return request(uri, payload);
};
