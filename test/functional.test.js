const assert = require('assert');
const HT = require('../lib/hypertrack');

describe('Devices API tests', () => {
	before(function() {
    if (!process.env.HT_ACCOUNT_ID) {
	  	throw 'HT_ACCOUNT_ID is not setup';
    }

    if (!process.env.HT_SECRET_KEY) {
	  	throw 'HT_SECRET_KEY is not setup';
    }

    if (!process.env.EXISTING_DEVICE_ID) {
	  	throw 'EXISTING_DEVICE_ID is not setup';
    }
  });

	const ht = new HT(process.env.HT_ACCOUNT_ID, process.env.HT_SECRET_KEY);

	it('Get single device', () => {
		return ht.devices.get(process.env.EXISTING_DEVICE_ID)
	});

	it('Get not existing device', () => {
		return ht.devices.get("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA").catch(error => {
			assert.equal(error.status, 404);
			assert.equal(error.code, 'device_not_found');
		})
	});

	it('Get all devices', () => {
		return ht.devices.getAll()
	});

	it('Get all devices with pagination', () => {
		return ht.devices.getAll(pagination=true).then(data => {
			assert.ok('data' in data);
		})
	});

	it('Change device name', () => {
		let test_device_name = "Test Change Name";
		let init_device_name;
		return ht.devices.get(process.env.EXISTING_DEVICE_ID).then(device => {
			init_device_name = device.device_info.name;
			// Change to new name
			ht.devices.changeName(process.env.EXISTING_DEVICE_ID, test_device_name)
			return ht.devices.get(process.env.EXISTING_DEVICE_ID)
		}).then(device => {
			assert.equal(device.device_info.name, test_device_name);
			ht.devices.changeName(process.env.EXISTING_DEVICE_ID, init_device_name);
			return ht.devices.get(process.env.EXISTING_DEVICE_ID)
		}).then(device => {
			// Return back old name
			assert.equal(device.device_info.name, init_device_name);
		})
	});

});

describe('Trips API tests', () => {
	before(function() {
    if (!process.env.HT_ACCOUNT_ID) {
	  	throw 'HT_ACCOUNT_ID is not setup';
    }

    if (!process.env.HT_SECRET_KEY) {
	  	throw 'HT_SECRET_KEY is not setup';
    }

    if (!process.env.EXISTING_DEVICE_ID) {
	  	throw 'EXISTING_DEVICE_ID is not setup';
    }
  });

	const ht = new HT(process.env.HT_ACCOUNT_ID, process.env.HT_SECRET_KEY);
	let trip_id;

	it('Create trip without destination', () => {
		return ht.trips.create({
			device_id: process.env.EXISTING_DEVICE_ID
		}).then(trip => {
			trip_id = trip.trip_id;
			assert.ok(trip_id != undefined);
		})
	});

	it('Get trip', () => {
		return ht.trips.get(trip_id)
	});

	it('Complete trip', () => {
		return ht.trips.complete(trip_id).then(() => {
			return ht.trips.get(trip_id)
		}).then(trip => {
			assert.ok(['completed', 'processing_completion'].includes(trip.status))
		})
	});	
});