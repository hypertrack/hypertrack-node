'use strict';

const axios = require('axios').default;

const BASE_URL = 'https://v3.api.hypertrack.com/';


function HyperTrack(accountId, secret) {
	if (!(this instanceof HyperTrack)) {
	    return new HyperTrack(accountId, secret);
	  }

	this.HTrequest = require('./ht_request');
	this.devices = require('./devices');

	this.initialize(accountId, secret);

	
}

HyperTrack.prototype = {
	initialize(accountId, secret) {
		// TODO: (node:93005) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
		let buff = new Buffer(accountId + ":" + secret);
		let authHeader = "Basic " + buff.toString('base64');
		this.HTrequest._axios.defaults.baseURL = BASE_URL;
		this.HTrequest._axios.defaults.headers.common['Authorization'] = authHeader;
	},
}



module.exports = HyperTrack;