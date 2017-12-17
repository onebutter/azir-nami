import config from 'config';
import { defaultOptions, request } from 'Utils/api';

export const postRegisterAPI = credentials => {
  const payload = {
    ...defaultOptions('POST'),
    body: JSON.stringify(credentials)
  };

  const uri = `${config.api.url}/auth/register`;
  return request(uri, payload);
};
