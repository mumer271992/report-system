/* eslint-disable object-shorthand */
import axios from 'axios';

const AxiosHelper = {
  // FIXME: This api basic url should get from env varibales
  base_url: 'http://localhost:5001',

  getList: function(endpoint, params) {
    const url = `${this.base_url}${endpoint}`;
    const config = {};
    config.params = params;
    return axios.get(url, config).then(resp => resp.data);
  },

  get: function(endpoint, params, isFullURL = false) {
    let url = `${this.base_url}${endpoint}`;
    if (isFullURL) {
      url = endpoint;
    }
    const config = {};
    config.params = params;

    return axios.get(url, config).then(resp => resp.data);
  },

  post: function(endpoint, data, queryParams) {
    const url = `${this.base_url}${endpoint}`;
    const config = {};
    if (queryParams) {
      config.params = queryParams;
    }
    return axios.post(url, data, config).then(resp => resp.data);
  },

  put: function(endpoint, data) {
    const url = `${this.base_url}${endpoint}`;
    const config = {};
    return axios.put(url, data, config).then(resp => resp.data);
  },

  delete: function(endpoint, params) {
    const url = `${this.base_url}${endpoint}`;
    const config = {};
    config.params = params;
    return axios.delete(url, config).then(resp => resp.data);
  }
};

export default AxiosHelper;
