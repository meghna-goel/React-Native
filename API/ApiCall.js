/* eslint-disable */

import axios from "axios";
const axiosApi = axios.create();

function setHeaderOptions(config) {
  let headers = {};
  if (config.header) {
    headers = config.header;
  }
  return headers;
}
const ApiCall = {
  getCall: function(config) {
    return axiosApi
      .get(config.url, { headers: config.header, cancelToken: config.cancelToken })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error
      });
  },

  postCall: function(config) {
    let headers = setHeaderOptions(config);
    return axiosApi
      .post(config.url, config.body, { headers: headers })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
       
          return error;
        
      });
  },
  deleteCall: function(config) {
    let headers = setHeaderOptions(config);
    return axiosApi
      .delete(config.url, { headers: headers })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
    
          return error;
       
      });
  },
  updateCall: function(config) {
    let headers = setHeaderOptions(config);
    return axiosApi
      .put(config.url, config.body, { headers: headers })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
      
          return error;
       
      });
  },
  allCall: function(config) {
    let headers = setHeaderOptions(config);
    return axios
      .all(config.url, { headers: headers })
      .then(
        axios.spread(function(response) {
          return response;
        })
      )
      .catch(function(error) {
       
          return error;
      
      });
  }
};

export default ApiCall;
