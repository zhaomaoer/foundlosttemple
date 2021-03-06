
var express = require('express');

// pass the express to the connect redis module
// allowing it to inherit from express.session.Store
//var RedisStore = require('connect-redis')(express);
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
var app = express();

//app.use(express.favicon());

//product and /home/products are static html, script, jpg files
app.use(express.static(__dirname + '/static'));

//use a sceret key
app.use(express.cookieParser('found lost temple'));
//app.use(express.session( {secret: 'store 4 lucy'} ));
// Populates req.session
app.use(express.session(
    { 
        /*cookie: {
            path: "/",
            httpOnly: true,
            maxAge: null
        },  */      
        key: 'foundlosttemple', 
        secret: 'found lost temple', 
        store: sessionStore })

);
///app.use(express.cookieSession());

//use body parser
app.use( express.bodyParser( /*{uploadDir: __dirname + '/uploads'}*/ ) );

var utils = require('./utils');

//home page
app.get('/', function(request, response){
    utils.writeHTML2Client(__dirname + '/static/index.html', response);
} );

//user management
var userMgmt = require('./usermgmt/auth');
app.post('/auth', userMgmt.signin);
app.get('/signin', function(request, response){
    utils.writeHTML2Client(__dirname + '/static/signin/signin.html', response);
} );

//dashboard
app.get('/dashboard', function(request, response){
    utils.writeHTML2Client(__dirname + '/static/dashboard/dashboard.html', response);
        
} );

app.get('/team', function(request, response){
    utils.writeHTML2Client(__dirname + '/static/dashboard/team.html', response);
});

app.get('/content', function(request, response){
    utils.writeHTML2Client(__dirname + '/static/dashboard/content.html', response);
});


app.listen(80);

console.log("app listening on port 80.");