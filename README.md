# node-deluge
A simple Deluge NodeJs API interface/wrapper, asynchronous NodeJs module to interact with the Deluge torrent client API.

[![Build Status](https://travis-ci.org/Nusrath/node-deluge.svg?branch=master)](https://travis-ci.org/Nusrath/node-deluge)

## INSTALLATION
```
npm install --save node-deluge
```

## USAGE

First 'require' the package into your project
node-deluge accepts 3 parameters as input:

- `hostname:` _your server's url, eg._ `deluge.nusrath.com` _or_ `192.168.1.111`
- `password:` _your server's_ `password`
- `port:` _the_ `port` _your server consumes - the default is_ `8112` _, if you are running the default port, use_ `null` _here_

```javascript
var deluge = require('node-deluge')(hostname, password, port);
```

### Make use of the various methods
The syntax is as follows: 
```javascript
deluge.method(callback(json_data))
```

## METHODS
_There are currently 2 methods available:_

`get_status` this method returns as JSON the status of all torrents currently added to the client.
`get_config` this method returns as JSON the current configuration of the torrent client, including download paths, etc.

## TODO
_Include all methods mentioned in the link specified in the 'RESOURCES' section_

## RESOURCES
[Deluge API documentation](http://dev.deluge-torrent.org/wiki/Development/WebUi/Json)