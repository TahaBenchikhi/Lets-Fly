const express = require( "express" );

https = require( "https" );
axios = require( "axios" );
db = require( "./../db" );
async = require( "async" );
router = express.Router();

router.post( "/getOtherCompaniesFlights", ( request, res ) => {
    let date = request.body.date;

    origin = request.body.depart;
    dest = request.body.destination;
    adults = request.body.adults;
    childrens = request.body.childrens;

    axios.post( "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDEJh3JYDQ0cJE4-v-Srd9y2kjPVcA3mhE", {
        "request": {
            "slice": [ {
                origin,
                "destination": dest,
                date,
                "maxStops": 0
            } ],
            "passengers": {
                "adultCount": adults,
                "infantInLapCount": 0,
                "infantInSeatCount": 0,
                "childCount": 0,
                "seniorCount": childrens
            },
            "solutions": 150,
            "refundable": false
        }
    } )
        .then( ( response ) => {
            const Data = response.data.trips.tripOption;

            DataCompany = response.data.trips.data.carrier;
            SendData = [];

            Object.keys( Data ).forEach( ( key, i ) => {
                if ( Data ) {
                    Object.keys( DataCompany ).forEach( ( key2, j ) => {
                        if ( Data[ i ].slice[ 0 ].segment[ 0 ].flight.carrier === DataCompany[ j ].code ) {
                            SendData.push( {
                                "flightcarrier": Data[ i ].slice[ 0 ].segment[ 0 ].flight.carrier,
                                "carriername": DataCompany[ j ].name,
                                "flightnumber": Data[ i ].slice[ 0 ].segment[ 0 ].flight.number,
                                "arrivalTime": Data[ i ].slice[ 0 ].segment[ 0 ].leg[ 0 ].arrivalTime,
                                "departureTime": Data[ i ].slice[ 0 ].segment[ 0 ].leg[ 0 ].departureTime,
                                "origin": Data[ i ].slice[ 0 ].segment[ 0 ].leg[ 0 ].origin,
                                "destination": Data[ i ].slice[ 0 ].segment[ 0 ].leg[ 0 ].destination,
                                "terminal": Data[ i ].slice[ 0 ].segment[ 0 ].leg[ 0 ].destinationTerminal,
                                "duration": Data[ i ].slice[ 0 ].segment[ 0 ].leg[ 0 ].duration,
                                "totalprice": Data[ i ].pricing[ 0 ].saleTotal
                            } );
                        }
                    } );
                }
            } );
            https.get( "https://gist.githubusercontent.com/TahaBenchikhi/65fbc1c65c6b7217accdd3ec45f178b0/raw/517abca550e55731752c07a8eae825ecb4dcfaa0/images.json", ( rest ) => {
                let body = "";

                rest.on( "data", ( chunk ) => {
                    body += chunk;
                } );

                rest.on( "end", () => {
                    const data = JSON.parse( body );

                    async.forEachOf( SendData, ( value, key, callback2 ) => {
                        async.forEach( data, ( obj, callback ) => {
                            if ( obj.filename.replace( "logo", "" ).replace( /[_-]/g, "" ).replace( /[0-9]/g, "" ).replace( /[\[\]&()]+/g, "" )
                                .toLowerCase()
                                .indexOf( SendData[ key ].carriername.toLowerCase().replace( /\s+/g, "" ) ) > -1 ) {
                                SendData[ key ].image = obj.filename;
                            }
                            callback();
                        }, ( err ) => {
                            if ( err ) {
                                throw new Error( err );
                            }
                            callback2();
                        } );
                    }, ( err ) => {
                        if ( err ) {
                            throw new Error( err );
                        }
                        res.send( SendData );
                        res.end();
                    } );
                } );
            } ).on( "error", ( e ) => {
                if ( e ) {
                    throw new Error( e );
                }
            } );
        } )
        .catch( ( error ) => {
            res.send( false );
            res.end();
            throw new Error( error );
        } );
} );

router.post( "/getLetsFlyFlights", ( request, res ) => {
    const departureDate = request.body.departure_date;

    backdate = request.body.back_date;
    depart = ( request.body.depart ).substr( 0, 3 );
    destination = ( request.body.destination ).substr( 0, 3 );
    personnes = request.body.personnes;

    db.letsFlyFlights( depart, destination, departureDate, personnes, ( error, aller ) => {
        if ( error ) {
            throw new Error( error );
        }
        if ( backdate !== "0000-00-00" ) {
            db.letsFlyFlights( destination, depart, backdate, personnes, ( err, retour ) => {
                if ( err ) {
                    throw new Error( err );
                }
                const result = {
                    aller,
                    retour
                };

                res.send( JSON.stringify( result ) );
                res.end();
            } );
        } else {
            const result = {
                aller
            };

            res.send( JSON.stringify( result ) );
            res.end();
        }
    } );
} );

module.exports = router;
