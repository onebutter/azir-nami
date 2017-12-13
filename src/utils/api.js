import config from 'config';

const defaultOptions = method => ({
  method,
  headers: new Headers({
    'Content-Type': 'application/json'
  })
});

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) return res;
  const error = new Error(res.statusText);
  error.status = res.status;
  res.json().then(errorData => {
    error.response = errorData;
  });
  throw error;
};

const request = (url, payload) => {
  return fetch(url, payload)
    .then(checkStatus)
    .then(res => res.json());
};

export const postRegister = credentials => {
  const payload = {
    ...defaultOptions('POST'),
    body: JSON.stringify(credentials)
  };

  const uri = `${config.api.url}/auth/register`;
  return request(uri, payload);
};
