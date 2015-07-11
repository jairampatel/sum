var express = require('express');
var app = express();
var exphbs = require('express3-handlebars');
var cookieParser = require('cookie-parser');
var util = require('util');
var bodyParser = require('body-parser');

app.use('/public', express.static('public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : false }));

app.engine('handlebars',
	exphbs({defaultLayout: 'main'}));

app.set('view engine','handlebars');

app.get('/', function(req,res){
    var currentScore;
    var hs = 0;
    if(req.cookies.highScore){
        hs = req.cookies.highScore;
    }
    
	res.render('index',{
        highScore: hs
    });
});



var port = Number(process.env.PORT || 5000);

app.listen(port);
