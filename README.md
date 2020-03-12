# hypertrack-node
Hypertrack API node module

Initialization:
```
const Hypertrack = require('hypertrack')('accountId', 'secretKey');
// OR
cost HT = new Hypertrack('accountId', 'secretKey');
```

Devices API examples:
```
hypertrack.devices.getDevice("33A889DD-1A3B-4900-B378-9A76EA948B91").then(deviceData => {
	// Process deviceData
}).catch(error => {
	// Handle errors
})
...
```
List of Devices API methods:
```
getDevice(deviceId)
getDeviceHistory(deviceId, date)
startTracking(deviceId)
stopTracking(deviceId)
patchDeviceName(deviceId, name)
patchDeviceMetadata(deviceId, metadata)
delete(deviceId)
getAll(pagination, paginationToken)
```

Trips API examples(Not ready yet):
```
hypertrack.trips.get(tripId)
```
