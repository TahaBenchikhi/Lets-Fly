
const argv = require( "minimist" )( process.argv.slice( 2 ) );

subpath = require( "./routes/swagger" );
swagger = require( "swagger-node-express" ).createNew( subpath );
domain = "localhost";
port = 8081;


swagger.setApiInfo( {
    "title": "example API",
    "description": "API to do something, manage something...",
    "termsOfServiceUrl": "",
    "contact": "yourname@something.com",
    "license": "",
    "licenseUrl": ""
} );

swagger.configureSwaggerPaths( "", "api-docs", "" );

// Configure the API domain
if ( argv.domain !== undefined ) {
    domain = argv.domain;
} else {
    console.log( 'No --domain=xxx specified, taking default hostname "localhost".' );
}

// Configure the API port
if ( argv.port !== undefined ) {
    port = argv.port;
} else {
    console.log( `No --port=xxx specified, taking default port ${ port }.` );
}

// Set and display the application URL
console.log( `snapJob API running on http://${ domain }:${ port}` );


swagger.configure( `http://${ domain }:${ process.env.PORT || port}`, "1.0.0" );


module.exports.swagger = swagger;
module.exports.subpath = subpath;
module.exports.port = port;
