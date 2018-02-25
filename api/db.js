const mysql = require( "mysql" );

https = require( "https" );

connection = mysql.createConnection( {
    "host": process.env.PROD ? "d5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com" : "localhost",
    "user": process.env.PROD ? "krmwlkdf2qpd98ku" : "root",
    "password": process.env.PROD ? "davlppsomw7v134z" : "root",
    "database": process.env.PROD ? "dfby0h7ngyjd6rzy" : "Flights",
    "multipleStatements": "true"
} );

generateBookID = function() {
    let text = "";

    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for ( let i = 0; i < 8; i++ ) {
        text += possible.charAt( Math.floor( Math.random() * possible.length ) );
    }

    return text;
};

module.exports = {
    "letsFlyFlights": function( depart, destination, date, personnes, callback ) {
        connection.query( `${"SELECT * FROM vols WHERE departure='"}${ depart }' and arrival='${ destination }' and departure_date='${ date }' and available_seats > ${ personnes } `, ( err, result ) => {
            if ( err ) {
                callback( err, null );
            }
            callback( null, result );
        } );
    },

    "getFlightsInfo": ( flightNum, callback ) => {
        let query = `SELECT * FROM vols WHERE num = ${ flightNum.flights[ 0 ]}`;

        if ( flightNum.flights[ 1 ] !== null ) {
            query += ` or num = ${ flightNum.flights[ 1 ]}`;
        }
        
        connection.query( query, ( err, result ) => {
            if ( err ) {
                callback( err, null );
            }
            callback( null, result );
        } );
    },

    "getReservationInfo": ( reservID, callback ) => {

        let existQuery = `SELECT count(id) as x FROM reservation WHERE id = '${ reservID.reservationID }'`;

        query = `SELECT * FROM reservation, vols WHERE reservation.numVol = vols.num and reservation.id = '${ reservID.reservationID }'`;

        connection.query( existQuery, ( errExist, exist ) => {
            if ( errExist ) {
                callback( errExist, null );
            } else if ( exist[ 0 ].x !== 0 ) {
                connection.query( query, ( err, result ) => {
                    if ( err ) {
                        callback( err, null );
                    }
                    callback( null, result );
                } );
            } else {
                callback( errExist, null );
            }

        } );
    },

    "bookFlight": function( bookinfo, callback ) {
       
        let addr = `${bookinfo.address } adr2${bookinfo.address_2}`;
        let bookid = generateBookID();
        query = `${"INSERT INTO reservation (id,numVol,title,firstname,lastname,email,passport_num,address,phone,country,city,passeport_country,passeport_expiredate) VALUES ('"}${bookid}',${
            bookinfo.numVol},'${ bookinfo.title}','${ bookinfo.firstname}','${ bookinfo.lastname}','${ bookinfo.email}','${ bookinfo.passport_num}','${ addr}',${
            bookinfo.phone},'${ bookinfo.country}','${ bookinfo.city}','${ bookinfo.passport_country}','${ bookinfo.passport_valid_until
        }')`;

        connection.query( query, ( err, result ) => {
            if ( err ) {
                callback( err, null );
            }
            result.bookid = bookid;
            callback( null, result );
        } );
    },

    "apiFlights": function (callback) {
      connection.query('SELECT * FROM vols', ( err, result ) => {
            if ( err ) {
                callback( err, null );
            }
            callback( null, result );
        });
    },
    "connection": connection
};

module.exports.db = connection;
