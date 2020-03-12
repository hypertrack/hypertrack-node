'use strict';

const axios = require('axios').default;

const BASE_URL = 'https://v3.api.hypertrack.com/';


function HyperTrack(account_id, secret) {
	if (!(this instanceof HyperTrack)) {
	    return new HyperTrack(account_id, secret);
	  }

	this.HTrequest = require('./ht_request');
	this.devices = require('./devices');

	this.initialize(account_id, secret);

	
}

HyperTrack.prototype = {
	initialize(account_id, secret) {
		// TODO: (node:93005) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
		let buff = new Buffer(account_id + ":" + secret);
		let authHeader = "Basic " + buff.toString('base64');
		this.HTrequest._axios.defaults.baseURL = BASE_URL;
		this.HTrequest._axios.defaults.headers.common['Authorization'] = authHeader;
	},
}



module.exports = HyperTrack;