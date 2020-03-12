# hypertrack-node
Hypertrack API node module

Initialization:
```
const hypertrack = require('hypertrack')('account_id', 'secret_key');
```

Devices API examples:
```
hypertrack.devices.get_device("33A889DD-1A3B-4900-B378-9A76EA948B91").then(device_data => {
	// Process device_data
}).catch(error => {
	// Handle errors
})
...
```
List of Devices API methods:
```
get_device(device_id)
get_device_history(device_id, date)
start_tracking(device_id)
stop_tracking(device_id)
patch_device_name(device_id, name)
patch_device_metadata(device_id, metadata)
delete(device_id)
get_all(pagination, pagination_token)
```

Trips API examples(Not ready yet):
```
hypertrack.trips.get(trip_id)
```
