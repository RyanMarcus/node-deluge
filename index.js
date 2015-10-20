/**
 * Created by nusrathkhan on 2015/10/20.
 */
var http = require('http');
var zlib = require('zlib');
var schedule = require('node-schedule');

module.exports = function deluge(hostname, password, port){

    // INIT vars
    if(port == null){
        port = 8112;
    }

    var counter;
    var auth_cooke = "";

    //login to deluge
    auth(function (data){
        loggit(data)
    });

    //update cookie every hour, as it expires
    var j = schedule.scheduleJob('0 * * * *', function(){
        auth(loggit);
    });

    function get_config(callback)
    {
        var params = [];
        send_request("core.get_config", params, function(data){
            callback(data)
        });
    }

    function get_status(callback)
    {
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
            callback(data)
        });
    }

    function loggit(data)
    {
        if(JSON.parse(data).result == true){
            console.log("Successfully authenticated with Deluge client!")
        }
        else{
            console.error("Deluge authentication failed, please check whether your hostname, password & port are correct!")
        }

    }

    function auth(callback)
    {
        var params = [ password ];
        send_request("auth.login", params,callback);

    }

    function send_request(method, params, callback) {

        //setup our request payload from input params
        var payload ={
            'method' : method,
            'params' : params,
            'id'     : counter++
        };

        //make payload a string for http request
        payload = JSON.stringify(payload);

        //set auth cookie if already authenticated
        var head;
        if(auth_cooke != ""){
            head = {
                'Cookie': auth_cooke
            };
        }

        //setup our http request parameters
        var options = {
            hostname: hostname,
            port: port,
            path: '/json',
            method: 'POST',
            headers: head
        };

        var req = http.request(options, function(res) {

            var gunzip = zlib.createGunzip();
            res.pipe(gunzip);

            if(auth_cooke == ""){
                auth_cooke = JSON.stringify(res.headers['set-cookie']).slice(2,50);
            }

            var buffer = [];
            gunzip.on('data', function (chunk) {
                buffer.push(chunk.toString())
            });
            gunzip.on('end', function() {
                callback(buffer.join(""));
            })

        });

        //output http request errors to console
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        // write data to request body
        req.write(payload);
        req.end();

    }

    return {
        get_config: function (callback){
            get_config(callback);
        },
        get_status: function (callback){
            get_status(callback);
        }
    }
};