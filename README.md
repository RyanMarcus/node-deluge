# node-deluge
A simple Deluge NodeJs API interface/wrapper, asynchronous NodeJs module to interact with the Deluge torrent client API.

## INSTALLATION
```
npm install --save node-deluge
```

## USAGE

First 'require' the package into your project
node-deluge accepts 3 parameters as input:
hostname: _your server's url, eg. deluge.nusrath.com or 192.168.1.111_
password: _your server's password_
port: _the port your server consumes - the default is 8112, if you are running the default port, use 'null' here (without the quotes)_
```javascript
var deluge = require('node-deluge')(hostname, password, port);
```

### Make use of the various methods
The syntax is as follows: 
```javascript
deluge.method(callback(json_data))
```

## METHODS
### There are currently 2 methods available:

`get_status` this method returns as JSON the status of all torrents currently added to the client.
`get_config` this method returns as JSON the current configuration of the torrent client, including download paths, etc.