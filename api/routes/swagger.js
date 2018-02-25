const express = require( "express" );

router = express.Router();

router.get( "/", ( req, res ) => {
    res.sendFile( "index.html", { "root": `${__dirname }/../dist` } );
} );

module.exports = router;
