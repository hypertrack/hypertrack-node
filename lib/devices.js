'use strict';

const querystring = require('querystring');
const HTrequest = require('./ht_request');

const Devices = {
	get_device(device_id) {
		return HTrequest.get('/devices/' + device_id)
	},

	get_device_history(device_id, date) {
		return HTrequest.get('/devices/' + device_id + '/history/' + date)
	},

	get_all(pagination=false, pagination_token) {
		let query_string = {
			pagination: pagination ? 1 : 0
		};

		// TODO: fix pagination token, it's not returned from API
		// API return pagination url. Change API to return token 
		if(pagination_token) {
			query_string['pagination_token'] = pagination_token;
		}

		return HTrequest.get('/devices/?' + querystring.stringify(query_string))
	},

	start_tracking(device_id) {
		return HTrequest.post('/devices/' + device_id + '/start')
	},

	stop_tracking(device_id) {
		return HTrequest.post('/devices/' + device_id + '/stop')
	},

	patch_device_name(device_id, name) {
		let data = {
			name: name
		};

		return HTrequest.patch('/devices/' + device_id, data) 
	},

	patch_device_metadata(device_id, metadata) {
		let data = {
			metadata: metadata
		};

		return HTrequest.patch('/devices/' + device_id, data) 
	},

	delete(device_id) {
		return HTrequest.delete('/devices/' + device_id) 
	},
};

module.exports = Devices;