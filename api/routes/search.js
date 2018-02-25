const express = require( "express" );

https = require( "https" );
router = express.Router();

/* GET home page. */
router.post( "/airports", ( req, resp ) => {

    https.get( "https://gist.githubusercontent.com/TahaBenchikhi/60b1499bf7029b07358d47b72ed09b5a/raw/dd52bef90f2f6b8e9efde860b995eaa02ad1fe05/letsfly_aero.json", ( res ) => {
        let body = "";
        
        res.on( "data", ( chunk ) => {
            body += chunk;
        } );
    
        res.on( "end", () => {
            let fbResponse = JSON.parse( body );

            resp.send( JSON.stringify( fbResponse ) );
            resp.end();
        } );
    } ).on( "error", ( e ) => {
        throw new Error( "Got an error: ", e );
    } );

} );


module.exports = router;
