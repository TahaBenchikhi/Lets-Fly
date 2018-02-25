const express = require( "express" );

https = require( "https" );
router = express.Router();
db = require( "../db" );

router.get( "/flights_from/:_iata", ( req, res ) => {
    db.apiFlights( ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        let myFilteredData = flights.filter(function(obj) {
            return obj.departure === req.params._iata;
        });
        res.send( myFilteredData );
        res.end();
    } );
} );

router.get( "/flights_from/:_iata/date/:_date", ( req, res ) => {
    db.apiFlights( ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        let myFilteredData = flights.filter(function(obj) {
            return obj.departure === req.params._iata && obj.departure_date === req.params._date;
        });
        res.send( myFilteredData );
        res.end();
    } );
} );

router.get( "/flights_to/:_iata", ( req, res ) => {
    db.apiFlights( ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        let myFilteredData = flights.filter(function(obj) {
            return obj.arrival === req.params._iata;
        });
        res.send( myFilteredData );
        res.end();
    } );
} );

router.get( "/flights_to/:_iata/date/:_date", ( req, res ) => {
    db.apiFlights( ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        let myFilteredData = flights.filter(function(obj) {
            return (obj.arrival === req.params._iata && obj.arrival_date === req.params._date);
        });
        res.send( myFilteredData );
        res.end();
    } );
} );

router.get( "/flights/from/:_fromiata/to/:_toiata", ( req, res ) => {
    db.apiFlights( ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        let myFilteredData = flights.filter(function(obj) {
            return obj.departure === req.params._fromiata && obj.arrival === req.params._toiata;
        });
        res.send( myFilteredData );
        res.end();
    } );
} );

router.get( "/flights/from/:_fromiata/to/:_toiata/date/:_date", ( req, res ) => {
    db.apiFlights( ( err, flights ) => {
        if ( err ) {
            throw new Error( err );
        }
        let myFilteredData = flights.filter(function(obj) {
            return (obj.departure === req.params._fromiata && obj.arrival === req.params._toiata && obj.departure_date === req.params._date);
        });
        res.send( myFilteredData );
        res.end();
    } );
} );

module.exports = router;
