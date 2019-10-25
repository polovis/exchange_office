var express = require('express');
var axios = require('axios');
var cors = require('cors');

var app = express();

app.use(cors());


const port = 4500

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	axios({
		url: 'http://webtask.future-processing.com:8068/currencies', 
		responseType: 'json'})
	.then(response => {
  		res.json(response.data);
	});
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))