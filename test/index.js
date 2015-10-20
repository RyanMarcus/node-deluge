var should = require('chai').should(),
    deluge = require('../index'),

describe('#get_config', function() {
  it('gets the current status of the deluge client', function() {
    deluge.get_config(function(data){ var ret = typeOf data; ret.should.equal("object")});
  });
});

describe('#get_status', function() {
  it('gets the current config of the deluge client', function() {
    deluge.get_status(function(data){ var ret = typeOf data; ret.should.equal("object")});
  });
});