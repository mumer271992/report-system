import AxiosHelper from '../helpers/AxiosHelper';

const RESOURCE_URL = '/datapoints';

const datapoints = {
  update: data => {
    return new Promise((resolve, reject) => {
      AxiosHelper.post(`${RESOURCE_URL}/update`, data)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => reject(error));
    });
  },
  report: data => {
    return new Promise((resolve, reject) => {
      AxiosHelper.post(`${RESOURCE_URL}/report`, data)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => reject(error));
    });
  }
};

export default datapoints;
