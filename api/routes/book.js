const express = require( "express" );

https = require( "https" );
router = express.Router();
db = require( "./../db" );


router.post( "/getSelectedFlightsInfo", ( req, res ) => {
    let numFlights = req.body;

    db.getFlightsInfo( numFlights, ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        res.send( flights );
        res.end();
    } );
} );

router.post( "/booking", ( req, res ) => {
    db.bookFlight( req.body.bookinfo, ( err, numBook ) => {
        if ( err ) {
            throw new Error( err );
        }
        res.send( numBook );
        res.end();
    } );
} );

module.exports = router;
