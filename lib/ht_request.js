'use strict';

const axios = require('axios').default;

const HTrequest = {
	_axios: axios,

	get(url) {
		return this._process_response(this._axios.get(url))
  	},

  	post(url, data) {
  		return this._process_response(this._axios.post(url, data))
  	},
  	
  	patch(url, data) {
  		return this._process_response(this._axios.patch(url, data))
  	},

  	delete(url){
  		return this._process_response(this._axios.delete(url))
  	},

  	_process_response(response_promise) {
  		return response_promise.then(resp => {
  			return resp.data
  		}).catch(error => {
  			// TODO: check for errors
  			return Promise.reject(error.response.data)
  		}) 
  	}
};


module.exports = HTrequest;