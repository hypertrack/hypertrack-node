# hypertrack-node
Hypertrack API node module

### Initialization:
```
const Hypertrack = require('hypertrack')('accountId', 'secretKey');
// OR
const Hypertrack = require('hypertrack');
const HT = new Hypertrack('accountId', 'secretKey');
```

This helper library provides `devices` and `trips` API and they are available under `Hypertrack` class.
```
const devices_api = HT.devices;
// OR use directly
HT.devices.{device_method}()
```

### Devices API methods:
| Name  | Description | Arguments | 
| ------------- | ------------- | ------------- |
| `.getAll(pagination=false, paginationToken)`  | Get all tracked devices. | `pagination` - if set to `true` it will split result by pages and response will containe `pagination_token` <br/> `paginationToken` - that should be provided to fetch next page |
| `.get(deviceId)`  | Get a single device | `deviceId` - a string representing the ID of a tracked device, case sensitive|
| `.getHistory(deviceId, date)`  | Get a single device history. | `deviceId` - a string representing the ID of a tracked device, case sensitive<br/>`date` - a string representing specific date in format YYYY-MM-DD |
| `.startTracking(deviceId)`  | Start tracking | `deviceId` - a string representing the ID of device, case sensitive |
| `.stopTracking(deviceId)`  | Stop tracking  | `deviceId` - a string representing the ID of device, case sensitive |
| `.changeName(deviceId, name)`  | Update a single device's name | `deviceId` - a string representing the ID of device, case sensitive<br/> `name` - new device name |
| `.patchMetadata(deviceId, metadata)`  | Update a single device's metadata  | `deviceId` - a string representing the ID of device, case sensitive<br/> `metadata` - new device metadata object |
| `.delete(deviceId)`  | Remove a single device. Once it is removed, the device will not be able send location data| `deviceId` - a string representing the ID of device, case sensitive |

### Trips API methods:
| Name  | Description | Arguments |
| ------------- | ------------- | ------------- |
| `.create(tripData)`  | Start a new trip for a device. | `tripData` - object with [data](https://docs.hypertrack.com/#references-apis-trips-post-trips) |
| `.getAll(tripStatus='completed', paginationToken)`  | Get all trips. This endpoint return active trips by default | `tripStatus` - (optional) a string representing the trip status to filter by. Default is `active` . Can be one of `active \| completed \| processing_completion`<br/>`paginationToken` allows you to request next page of trips list |
| `.get(tripId)`  | Get a single trip | `tripId` - a string representing the ID of a trip, case sensitive |
| `.patchGeofenceMetadata(tripId, geofenceId, metadata)`  | Update a trip geofence metadata. | `tripId` - a string representing the trip ID<br/>`geofenceId` - a string representing the geofence ID for which metadata is being updated<br/>`metadata` - is JS Object with data to update |
| `.getGeofence(tripId, geofenceId)`  | Get trip geofence | `tripId` - a string representing the trip ID<br/>`geofenceId` - a string representing the geofence ID for which metadata is being updated |
| `.complete(tripId)`  | Complete an active trip. This will initiate a procedure on the HyperTrack platform | `tripId` - a string representing the trip ID |


All API methods return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Examples:

Change device name:
```
const Hypertrack = require('./lib/Hypertrack');
const ht = new Hypertrack('account_id', 'secret_key');

// Get signle device by device id
ht.devices.get("FB1C99E3-CB2B-303A-9F92-E7AAAC22F72F").then(device => {
  console.log(device.device_info.name);
  // Output --> Denys
  
  // Change name
  ht.devices.changeName("FB1C99E3-CB2B-303A-9F92-E7AAAC22F72F", "Test Change Name");
  
  // Return promise so we could do .then() on next block.
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
