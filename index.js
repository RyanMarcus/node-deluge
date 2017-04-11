/**
 * Created by nusrathkhan on 2015/10/20.
 */
var http = require('http');
var zlib = require('zlib');
var schedule = require('node-schedule');
var Q = require("q");
var request = require("request").defaults({jar: true});

module.exports = function deluge(hostname, password, port){

    // INIT vars
    if(port == null){
	port = 8112;
    }

    var counter;
    var auth_cooke = "";




    //update cookie every hour, as it expires
    var j = schedule.scheduleJob('0 * * * *', function(){
	auth(loggit);
    });

    function close() {
	j.cancel();
    }

    function get_config()
    {
	var toR = Q.defer();
	var params = [];
	send_request("core.get_config", params, function(data){
	    if (data) {
		toR.resolve(data);
	    } else {
		toR.reject(data);
	    }
	});

	return toR.promise;
    }

    function get_status(callback)
    {
	var toR = Q.defer();
	var params;

	params = [
	    [
		"queue",
		"name",
		"total_size",
		"state",
		"progress",
		"num_seeds",
		"total_seeds",
		"num_peers",
		"total_peers",
		"download_payload_rate",
		"upload_payload_rate",
		"eta",
		"ratio",
		"distributed_copies",
		"is_auto_managed",
		"time_added",
		"tracker_host",
		"save_path",
		"total_done",
		"total_uploaded",
		"max_download_speed",
		"max_upload_speed",
		"seeds_peers_ratio"
	    ],
	    [

	    ]
	];

	send_request("web.update_ui", params, function(data){
	    if (data) {
		toR.resolve(data);
	    } else {
		toR.reject(data);
	    }
	});

	return toR.promise;
    }

    function loggit(data)
    {
	if(data.result == true){
	    console.log("Successfully authenticated with Deluge client!");
	}
	else{
	    console.error("Deluge authentication failed, please check whether your hostname, password & port are correct!");
	}

    }

    
    function auth()
    {
	var toR = Q.defer();
	var params = [ password ];
	send_request("auth.login", params, function(res) {
	    if (res) {
		toR.resolve(res);
	    } else {
		toR.reject(res);
	    }
	});

	return toR.promise;
    }

    function send_request(method, params, callback) {

	//setup our request payload from input params
	var payload ={
	    'method' : method,
	    'params' : params,
	    'id'     : counter++
	};

        request.post(hostname + ":" + port + "/json", {
            json: {
	        'method' : method,
	        'params' : params,
	        'id'     : counter++
            }
        }, function (error, response, body) {
            if (error) {
                console.error(error);
                return;
            }

            callback(body);
        });
    }

    return {
	getConfig: get_config,
	getStatus: get_status,
	auth: auth,
	close: close
    };
    
};
