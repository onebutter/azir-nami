export const defaultOptions = (method, options = {}) => {
  if (options.token) {
    return {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${options.token}`
      })
    };
  }
  return {
    method,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };
};

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) return res;
  const error = new Error(res.statusText);
  error.status = res.status;
  res.json().then(errorData => {
    error.response = errorData;
  });
  throw error;
};

export const request = (url, payload) => {
  return fetch(url, payload)
    .then(checkStatus)
    .then(res => res.json());
};
