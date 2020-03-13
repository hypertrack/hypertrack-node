'use strict';

const axios = require('axios').default;

const HTRequest = {
	_axios: axios,

	get(url) {
		return this._processResponse(this._axios.get(url))
  	},

  	post(url, data) {
  		return this._processResponse(this._axios.post(url, data))
  	},
  	
  	patch(url, data) {
  		return this._processResponse(this._axios.patch(url, data))
  	},

  	delete(url){
  		return this._processResponse(this._axios.delete(url))
  	},

  	_processResponse(responsePromise) {
  		return responsePromise.then(resp => {
  			return resp.data
  		}).catch(error => {
  			return Promise.reject(error.response.data)
  		}) 
  	}
};


module.exports = HTRequest;