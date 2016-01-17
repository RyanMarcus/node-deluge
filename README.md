# node-deluge
A simple Deluge NodeJs API interface/wrapper, asynchronous NodeJs module to interact with the Deluge torrent client API.

[![Build Status](https://travis-ci.org/Nusrath/node-deluge.svg?branch=master)](https://travis-ci.org/Nusrath/node-deluge) [![npm version](https://badge.fury.io/js/node-deluge.svg)](https://badge.fury.io/js/node-deluge)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Nusrath/node-deluge/master/LICENSE)

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
var deluge = require('node-deluge')(hostname, password, port).then(function (res) {
  // res is true if authentication is good, false otherwise.
});
```

### Make use of the various methods
The syntax is as follows: 
```javascript
var deluge = require('node-deluge')(hostname, password, port).then(function (res) {
  // res is true if authentication is good, false otherwise.
  return deluge.getStatus(); // OR deluge.getConfig(), currently only two methods available
}).then(function (data) {
  // do something with the data..
  
  deluge.close(); // by default node-deluge keeps the connection open and so programs won't terminate without this
});
```


## TODO
_Include all methods mentioned in the link specified in the 'RESOURCES' section_

## RESOURCES
[Deluge API documentation](http://dev.deluge-torrent.org/wiki/Development/WebUi/Json)
