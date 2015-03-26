var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var http_helpers = require('./http-helpers.js')

//var objectId = 1;
var siteNameStorage = [];
var storage = {results:[]};
// require more modules/folders here!


// var getUserRequestedURL= function(){
// 	var newURL = document.getElementById("userRequestedURL").value;
// 	alert(newURL);
// 	return false;
// };

exports.handleRequest = function (req, res) {
	var action = actions[req.method];
	action? action(req, res) : http_helpers.sendResponse(res, "NOT FOUND", 404);	


   //res.end(archive.paths.list);		//this line was given in repo
};


var collectData = function(request, callback){
	var data = "";
	request.on('data', function(chunk){
		data +=chunk;
	});
	request.on('end', function(){
		console.log("Data from CollectData: ", data);
		callback(data);				//May need to stringify for safety?
	})

};


var actions = {
	'GET': function(request, response){
		//extract newURL from request 
		console.log("In GET");
		//var pathName = url.parse(request.url).pathname;
    	var path = 'http://127.0.0.1:8080/index.html';


    	//Need to figure out where index.html lives on the server

    	fs.readFile('/Users/student/Documents/MKS15-web-historian/web/public/index.html' ,function(err, data){
    		//if (err){throw err;}
    		console.log("Data from GET:", data);

    	});
		// if(parts.query){
		// 	var newURL = parts.query;
		// }else{
		// 	http_helpers.sendResponse(response, "INVALID SITE", 400)  //BAD REQUEST. Bad user!
		// 	return;
		// }

		//console.log("GET is working ", request)

		//http_helpers.sendResponse(request, {results: true}) //how to shape newURL before sending
		response.writeHead(200, {'Location' : path});
		response.end(path);
		//Where to send it
	},
	'POST': function(request, response){
		console.log("Request: ", request, ", Response: ", response);

		collectData(request, function(data){

			console.log("Post is working,", data);
			//get URL from post
			var pathName = url.parse(request.url).pathname;
			//userRequestedURL

			//siteNameStorage.push(newURL);
			// newURL.objectId = ++objectId;
			//http_helpers.sendResponse(response, {objectId: 0});

			  //for now
		});



		response.end("http://127.0.0.1:8080/loading.html"); 
		//do we want an on-request

	},
	'OPTIONS': function(request, response){
		console.log("Options");
		http_helpers.sendResponse(response, null);
	}

};




// fs.readFile('messages.txt', function read(err, data) {
//   if (err) {
//     throw err;
//   }
//   storage = JSON.parse(data);
//   console.log(storage['results']);
//   counter = storage.results[storage.results.length-1]['objectId']+1;
//   console.log(counter);
// })