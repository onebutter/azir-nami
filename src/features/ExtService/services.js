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

export const getGithubToken = (token, body) => {
  const payload = {
    ...defaultOptions('POST', { token }),
    body: JSON.stringify(body)
  };

  const uri = `${config.api.url}/extservice/github`;
  return request(uri, payload);
};

export const getDiscordUser = token => {
  const payload = {
    ...defaultOptions('GET', { token })
  };

  const uri = `${config.api.discord.url}/users/@me`;
  return request(uri, payload);
};

export const getGithubUser = token => {
  const payload = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json'
    })
  };

  const uri = `${config.api.github.url}/user`;
  return request(uri, payload);
};
