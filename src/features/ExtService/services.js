import config from 'config';
import { defaultOptions, request } from 'Utils/api';

export const getDiscordToken = (token, body) => {
  const payload = {
    ...defaultOptions('POST', { token }),
    body: JSON.stringify(body)
  };

  const uri = `${config.api.url}/extservice/discord`;
  return request(uri, payload);
};

export const getDiscordUser = token => {
  const payload = {
    ...defaultOptions('GET', { token })
  };

  const uri = `${config.api.discord.url}/users/@me`;
  return request(uri, payload);
};
