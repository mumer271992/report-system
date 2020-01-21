import AxiosHelper from '../helpers/AxiosHelper';

const RESOURCE_URL = '/plants';

const plants = {
  add: data => {
    return new Promise((resolve, reject) => {
      AxiosHelper.post(RESOURCE_URL, data)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => reject(error));
    });
  },
  get: () => {
    return new Promise((resolve, reject) => {
      AxiosHelper.get(RESOURCE_URL)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => reject(error));
    });
  },
  delete: uid => {
    return new Promise((resolve, reject) => {
      AxiosHelper.delete(`${RESOURCE_URL}/${uid}`)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => reject(error));
    });
  }
};

export default plants;
