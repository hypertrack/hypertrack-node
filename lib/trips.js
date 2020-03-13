'use strict';

const querystring = require('querystring');
const HTRequest = require('./HTRequest');
const TRIPS_BASE_PATH = '/trips/';

const Trips = {
  create(tripData) {
    this._validateRequiredFields({tripData});
    return HTRequest.post(TRIPS_BASE_PATH, tripData)
  },

  complete(tripId) {
    this._validateRequiredFields({tripId});
    return HTRequest.post(TRIPS_BASE_PATH + tripId + '/complete')
  },

  getAll(tripStatus='completed', paginationToken) {
    let queryString = {
      status: tripStatus
    };
    
    if(paginationToken) {
      queryString['pagination_token'] = paginationToken;
    }

    return HTRequest.get(TRIPS_BASE_PATH + '?' + querystring.stringify(queryString))
  },

  getTrip(tripId) {
    this._validateRequiredFields({tripId});
    return HTRequest.get(TRIPS_BASE_PATH + tripId)
  },

  patchTripGeofenceMetadata(tripId, geofenceId, metadata) {
    this._validateRequiredFields({tripId, geofenceId, metadata});

    let data = {metadata};

    return HTRequest.patch(TRIPS_BASE_PATH + tripId + '/geofence/' + geofenceId, data)
  },

  getTripGeofence(tripId, geofenceId) {
    this._validateRequiredFields({tripId, geofenceId});
    return HTRequest.get(TRIPS_BASE_PATH + tripId + '/geofence/' + geofenceId)
  },

  _validateRequiredFields(fields) {
    for (const [name, value] of Object.entries(fields)) {
      if(!value) {
        throw new Error(name + " required!");
      }
    }
  }
};

module.exports = Trips;