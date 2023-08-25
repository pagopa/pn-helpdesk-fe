const setStorage = (name: string, value: string) =>
  new Promise((resolve) => {
    sessionStorage.setItem(name, value);
    return resolve('OK');
  });

const deleteStorage = (name: string) =>
  new Promise((resolve) => resolve(sessionStorage.removeItem(name)));

const resetStorage = () => new Promise((resolve) => resolve(sessionStorage.clear()));

const getStorage = (item: string) =>
  new Promise((resolve) => resolve(sessionStorage.getItem(item)));

export { setStorage, deleteStorage, resetStorage, getStorage };
