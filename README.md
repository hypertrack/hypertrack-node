# hypertrack-node
Hypertrack API node module

## Initialization:
```
const Hypertrack = require('hypertrack')('accountId', 'secretKey');
// OR
const Hypertrack = require('hypertrack');
const HT = new Hypertrack('accountId', 'secretKey');
```

There are two different API's, `trips` and `devices` and they are available under `Hypertrack` class.
```
const devices_api = HT.devices;
// OR use directly
HT.devices.{device_method}()
```

## Trips API methods:
| Name  | Description |
| ------------- | ------------- |
| `.get(tripId)`  | Get single trip by trip ID  |
| `.create(tripData)`  | Create trip  |
| `.complete(tripId)`  | Complete trip  |
| `.getAll(tripStatus='completed', paginationToken)`  | Get all trips in account. Can be filtered by trip status `active \| completed \| processing_completion`. `paginationToken` allows you to request next page of trips list |
| `.patchGeofenceMetadata(tripId, geofenceId, metadata)`  | Update trip geofence metadata. `metadata` is JS Object  |
| `.getGeofence(tripId, geofenceId)`  | Get trip geofence  |


## Devices API methods list:
| Name  | Description |
| ------------- | ------------- |
| `.get(deviceId)`  | Get single device by device ID |
| `.getHistory(deviceId, date)`  | Create device history |
| `.getAll(pagination=false, paginationToken)`  | Get all devices. If `pagination` set to `true` it will split result by pages and response will containe `pagination_token` that should be provided to fetch next page  |
| `.startTracking(deviceId)`  | Start device tracking |
| `.stopTracking(deviceId)`  | Stop device tracking  |
| `.changeName(deviceId, name)`  | Change device name |
| `.patchMetadata(deviceId, metadata)`  | Change device metadata  |
| `.delete(deviceId)`  | Remove device  |

All API methods return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Examples:

Change device name:
```
const Hypertrack = require('./lib/Hypertrack');
const ht = new Hypertrack('account_id', 'secret_key');

ht.devices.get("FB1C99E3-CB2B-303A-9F92-E7AAAC22F72F").then(device => {
  console.log(device.device_info.name);
  // --> Denys
	
  ht.devices.changeName("FB1C99E3-CB2B-303A-9F92-E7AAAC22F72F", "Test Change Name");
  return ht.devices.get("FB1C99E3-CB2B-303A-9F92-E7AAAC22F72F")
}).then(device => {
  console.log(device.device_info.name);
  // --> Test Change Name
}).catch(error => {
  // Error handling.
});
```

Using async/await:
```
(async () => {
  const device = await ht.devices.get("33A889DD-1A3B-4900-B378-9A76EA948B91");
  // Work with device data
})()
```

Errors can be catched in `.catch(error => {})` block.
Depends on resource there might be different error codes and details, full list of errors you can check [here](https://docs.hypertrack.com/#references-http-errors)

REST API documentation can be found [here](https://docs.hypertrack.com/#references-apis)
