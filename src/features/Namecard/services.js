import config from 'config';
import { defaultOptions, request } from 'Utils/api';

export const fetchUser = username =>
  new Promise(resolve => {
    resolve({
      profile: {
        username,
        aliases: [
          {
            type: 'In real life',
            value: 'Kenneth Lee'
          },
          {
            type: 'please call me',
            value: 'Ken'
          },
          {
            type: 'legal name',
            value: 'Changbok Lee'
          }
        ]
      },
      services: [
        {
          type: 'facebook',
          value: 'http://www.facebook.com/donkeysmash'
        },
        {
          type: 'email',
          value: 'changbok89@gmail.com'
        },
        {
          type: 'mobile',
          value: '5197212892'
        }
      ]
    });
  });

export const getNamecardsByUsernameAPI = (token, username) => {
  const payload = {
    ...defaultOptions('GET', { token })
  };

  const uri = `${config.api.url}/namecards?username=${username}`;
  return request(uri, payload);
};
