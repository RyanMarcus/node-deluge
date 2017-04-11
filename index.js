/**
 * Created by nusrathkhan on 2015/10/20.
 */
const schedule = require('node-schedule');
const Q = require("q");
const axios = require("axios");
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

module.exports = function deluge(hostname, password, port){

    // INIT vars
    if(port == null){
	port = 8112;
    }

    var counter = 0;
    var jar = new tough.CookieJar();
    




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
	send_request("auth.login", params, function(res, err) {
	    if (res) {
		toR.resolve(res);
	    } else {
		toR.reject(err);
	    }
	});

	return toR.promise;
    }

    function send_request(method, params, callback) {


        axios.post("http://" + hostname + ":" + port + "/json", {
	        'method' : method,
	        'params' : params,
	        'id'     : counter++
        }, {
            jar: jar,
            withCredentials: true,
            headers: {"content-type": "application/json"} // default includes encoding which breaks deluge :(
        }).then(res => {
            callback(res.data, false);
        }).catch(e => {
            callback(false, e);
        });
                 
    }

    return {
	getConfig: get_config,
	getStatus: get_status,
	auth: auth,
	close: close
    };
    
};


