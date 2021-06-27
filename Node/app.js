// Get this thing working wiht SystemD: https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/

const http = require('http');
const axios = require('axios');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3001;

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const mode = "dev";

const server = http.createServer((req, res) => {

  	if (mode === "dev"){
  		console.log("DEV MODE");
  		res.setHeader('Access-Control-Allow-Origin', "http://127.0.0.1:3000"); // Should only do this in "dev" mode
  		res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000"); // Should only do this in "dev" mode
  	}

  	let queryObject = url.parse(req.url,true).query;

	if (req.url.startsWith("/strava-oauth")){
		console.log("/strava-oauth");
	 	res.statusCode = 200;
	  	res.setHeader('Content-Type', 'text/plain');
	  	login(queryObject);
	  	res.end('Hello World');
	}
	else{
	 	res.statusCode = 200;
	  	res.setHeader('Content-Type', 'text/plain');
	  	res.end('Hello World');
	  }
});

server.listen(port, hostname, () => {
  	console.log(`Server running at http://${hostname}:${port}/`);
});

function login(queryObject){

  axios.post("https://www.strava.com/oauth/token", { 
    client_id: clientID,
    client_secret: clientSecret,
    code: queryObject.code,
    grant_type:"authorization_code"
  })
  .then(res => {
    //console.log("uhm");
    let userName = res.data.athlete['username'];
    console.log(userName);
    // window.location.replace(homeURL + "/loggedin?username=" + userName);
  })
  .catch(function (error) {
  	console.log("Something bad");
  })
  //window.location.replace(authUrl);
}