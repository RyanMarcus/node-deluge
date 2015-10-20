var should = require('chai').should(),
    deluge = require('../index')('sd-80083.dedibox.fr', 'deluge', null);

describe('#get_config', function() {
  it('gets the current status of the deluge client', function() {
    deluge.get_config(
    	function(data){
    		should.exist(data);
  			data.should.be.an('object');
    	}
    );
  });
});

describe('#get_status', function() {
  it('gets the current config of the deluge client', function() {
    deluge.get_status(
    	function(data){
    		should.exist(data);
  			data.should.be.an('object');
    	}
    );
  });
});