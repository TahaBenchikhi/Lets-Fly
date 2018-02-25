const express = require( "express" );
// let index = require( "./routes/index" );

search = require( "./routes/search" );
result = require( "./routes/result" );
book = require( "./routes/book" );
myflights = require( "./routes/myflights" );
email = require( "./routes/email" );
api = require( "./routes/api" );

app = express();
cors = require( "cors" );
bodyParser = require( "body-parser" );
swagger = require( "./swagger" );

app.use( bodyParser.urlencoded( {
    "extended": true
} ) );
app.use( bodyParser.json() );

app.use( cors( {
    "origin": true,
    "credentials": true
} ) );


/* Routes */
app.use( "/", search );
app.use( "/", result );
app.use( "/", book );
app.use( "/", myflights );
app.use( "/", email );
app.use( "/api", api );

app.use( "/swagger", express.static( "distSwagger" ) );
app.use( "/api/*", express.static( "distAPI" ) );
app.use( "/", express.static( "dist" ) );
app.use( "*", express.static( "dist" ) );

app.listen( process.env.PORT || swagger.port );
