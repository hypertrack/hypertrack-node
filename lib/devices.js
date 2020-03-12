'use strict';

const querystring = require('querystring');
const HTRequest = require('./HTRequest');

const Devices = {
	getDevice(deviceId) {
		return HTRequest.get('/devices/' + deviceId)
	},

	getDeviceHistory(deviceId, date) {
		return HTRequest.get('/devices/' + deviceId + '/history/' + date)
	},

	getAll(pagination=false, paginationToken) {
		let queryString = {
			pagination: pagination ? 1 : 0
		};

		// TODO: fix pagination token, it's not returned from API
		// API return pagination url. Change API to return token 
		if(paginationToken) {
			queryString['pagination_token'] = paginationToken;
		}

		return HTRequest.get('/devices/?' + querystring.stringify(queryString))
	},

	startTracking(deviceId) {
		return HTRequest.post('/devices/' + deviceId + '/start')
	},

	stopTracking(deviceId) {
		return HTRequest.post('/devices/' + deviceId + '/stop')
	},

	patchDeviceName(deviceId, name) {
		let data = {
			name: name
		};

		return HTRequest.patch('/devices/' + deviceId, data) 
	},

	patchDeviceMetadata(deviceId, metadata) {
		let data = {
			metadata: metadata
		};

		return HTRequest.patch('/devices/' + deviceId, data) 
	},

	delete(deviceId) {
		return HTRequest.delete('/devices/' + deviceId) 
	},
};

module.exports = Devices;