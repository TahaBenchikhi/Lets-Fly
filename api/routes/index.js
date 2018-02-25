const express = require( "express" );

router = express.Router();
con = require( "../db.js" );


/* GET home page. */
router.get( "/", ( req, resp ) => {
    resp.end( con.allflights() );
} );

module.exports = router;
