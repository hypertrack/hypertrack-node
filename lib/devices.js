'use strict';

const querystring = require('querystring');
const HTrequest = require('./HTRequest');

const Devices = {
	getDevice(deviceId) {
		return HTrequest.get('/devices/' + deviceId)
	},

	getDeviceHistory(deviceId, date) {
		return HTrequest.get('/devices/' + deviceId + '/history/' + date)
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

		return HTrequest.get('/devices/?' + querystring.stringify(queryString))
	},

	startTracking(deviceId) {
		return HTrequest.post('/devices/' + deviceId + '/start')
	},

	stopTracking(deviceId) {
		return HTrequest.post('/devices/' + deviceId + '/stop')
	},

	patchDeviceName(deviceId, name) {
		let data = {
			name: name
		};

		return HTrequest.patch('/devices/' + deviceId, data) 
	},

	patchDeviceMetadata(deviceId, metadata) {
		let data = {
			metadata: metadata
		};

		return HTrequest.patch('/devices/' + deviceId, data) 
	},

	delete(deviceId) {
		return HTrequest.delete('/devices/' + deviceId) 
	},
};

module.exports = Devices;