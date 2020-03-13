'use strict';

const axios = require('axios').default;
const BASE_URL = 'https://v3.api.hypertrack.com/';


function HyperTrack(accountId, secret) {
	if (!(this instanceof HyperTrack)) {
	    return new HyperTrack(accountId, secret);
	  }

	this.HTrequest = require('./HTRequest');
	this.devices = require('./devices');
	this.trips = require('./trips');
	this.initialize(accountId, secret);
}

HyperTrack.prototype = {
	initialize(accountId, secret) {
		if(!accountId || !secret) {
			throw new Error("accountId or secret was not provided!");
		}

		let buff = Buffer.from(accountId + ":" + secret);
		let authHeader = "Basic " + buff.toString('base64');
		this.HTrequest._axios.defaults.baseURL = BASE_URL;
		this.HTrequest._axios.defaults.headers.common['Authorization'] = authHeader;
	},
}



module.exports = HyperTrack;