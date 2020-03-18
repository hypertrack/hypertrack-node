'use strict';

const querystring = require('querystring');
const HTRequest = require('./HTRequest');
const DEVICES_BASE_PATH = '/devices/';

const Devices = {
  get(deviceId) {
    this._validateRequiredFields({deviceId});
    return HTRequest.get(DEVICES_BASE_PATH + deviceId)
  },

  getHistory(deviceId, date) {
    this._validateRequiredFields({deviceId, date});
    return HTRequest.get(DEVICES_BASE_PATH + deviceId + '/history/' + date)
  },

  getAccountHistory(date, response='blob', responseType='json', unit='km') {
    this._validateRequiredFields({deviceId, date, response, responseType, unit});
    let queryString = {
      response: response,
      type: responseType,
      unit: unit
    }

    return HTRequest.get(DEVICES_BASE_PATH + deviceId + '/history/' + date + '?' + querystring.stringify(queryString))
  },

  getAll(pagination=false, paginationToken) {
    let queryString = {
      pagination: pagination ? 1 : 0
    };

    if(paginationToken) {
      queryString['pagination_token'] = paginationToken;
    }

    return HTRequest.get(DEVICES_BASE_PATH + '?' + querystring.stringify(queryString))
  },

  startTracking(deviceId) {
    this._validateRequiredFields({deviceId});
    return HTRequest.post(DEVICES_BASE_PATH + deviceId + '/start')
  },

  stopTracking(deviceId) {
    this._validateRequiredFields({deviceId});
    return HTRequest.post(DEVICES_BASE_PATH + deviceId + '/stop')
  },

  changeName(deviceId, name) {
    this._validateRequiredFields({deviceId, name});
    let data = {name};

    return HTRequest.patch(DEVICES_BASE_PATH + deviceId, data) 
  },

  patchMetadata(deviceId, metadata) {
    this._validateRequiredFields({deviceId,metadata});
    let data = {metadata};

    return HTRequest.patch(DEVICES_BASE_PATH + deviceId, data) 
  },

  delete(deviceId) {
    this._validateRequiredFields({deviceId});

    return HTRequest.delete(DEVICES_BASE_PATH + deviceId) 
  },

  _validateRequiredFields(fields) {
    for (const [name, value] of Object.entries(fields)) {
      if(!value) {
        throw new Error(name + " required!");
      }
    }
  }
};

module.exports = Devices;