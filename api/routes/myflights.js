const express = require( "express" );

router = express.Router();
db = require( "./../db" );


router.post( "/myflights", ( req, res ) => {

    let reservID = req.body;
    console.log(reservID);
    db.getReservationInfo( reservID, ( err, reservation ) => {
        if ( err ) {
            throw new Error( err );
        }
        res.send( reservation );
        res.end();
    } );

} );

module.exports = router;
