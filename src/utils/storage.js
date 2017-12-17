import config from 'config';

function addNamespace(namespace = 'reachaf', key, delimiter = '_') {
  return `${namespace}${delimiter}${key}`;
}

export function store(name, data) {
  localStorage.setItem(
    addNamespace(config.localStorageNamespace, name),
    JSON.stringify(data)
  );
}

export function remove(name) {
  localStorage.removeItem(addNamespace(config.localStorageNamespace, name));
}

export function retrieve(name) {
  const result = localStorage.getItem(
    addNamespace(config.localStorageNamespace, name)
  );

  if (result) {
    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  }
}
