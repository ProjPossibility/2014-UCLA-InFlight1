var http = require('http');
var url = require('url');
var firebase = require('firebase');
http.createServer(function (req, res) {
	req.on("end", function()
	{	
		var _get = url.parse(req.url, true).query;
		res.writeHead(200, {'Content-Type':'text/plain'});
		if(_get['data'] == "movies")
		{
			var ret = "{\"movies\":[\n";
			var myDataRef = new firebase("https://burning-fire-5276.firebaseio.com/a");
			myDataRef.on('value', function(e) {
				for(var i = 0; i < e.val().length; i++)
				{
					ret += "{";
					ret += "\"title\" : \""+ e.val()[i].title+ "\",\n";
					ret += "\"description\" : \"" + e.val()[i].description + "\",\n";
					ret += "\"image\" : \"" + e.val()[i].picture + "\"\n";
					ret += "}";
					if(i != e.val().length-1)
					{
						ret += ",\n";
					}
				}

				res.end(ret+"]}\n");
			});
		}
		else if(_get['data'] == "food")
		{
			var ret = "{\"food\":[\n";
			var myDataRef = new firebase("https://burning-fire-5276.firebaseio.com/food");
			myDataRef.on('value', function(e) {
				for(var i = 0; i < e.val().length; i++)
				{
					ret += "{";
					ret += "\"name\" : \""+ e.val()[i].name+ "\",\n";
					ret += "\"price\" : \"" + e.val()[i].price + "\",\n";
					ret += "\"image\" : \"" + e.val()[i].picture + "\"\n";
					ret += "}";
					if(i != e.val().length-1)
					{
						ret += ",\n";
					}
				}

				res.end(ret+"]}\n");
			});
		}
	});
	req.resume();
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
