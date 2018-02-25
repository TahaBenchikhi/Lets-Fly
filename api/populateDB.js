var mysql = require('mysql');
var https = require('https');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'letsfly',
    multipleStatements: 'true'
});

https.get("https://api.ryanair.com/aggregate/3/common?embedded=airports&market=en-gb",
    function (res) {
        var iatas = [];
        var data1 = '';
        res.on('data', function (chunk) {
            data1 += chunk;
        });
        res.on('end', function () {
            var cities = JSON.parse(data1);
            for (var j = 0; j < cities.airports.length; j++) {
                var iataCode = JSON.stringify(cities.airports[j].iataCode).substr(1, 3);
                iatas.push(iataCode);
            }
            // Getting flights info from API using iataCodes
            iatas.forEach(function (element) {
                https.get("https://api.ryanair.com/farefinder/3/oneWayFares?&departureAirportIataCode=" + element + "&language=en&limit=20&market=en-gb&offset=0&outboundDepartureDateFrom=2017-10-11&outboundDepartureDateTo=2019-10-28",
                    function (res) {
                        var data2 = '';
                        res.on('data', function (chunk) {
                            data2 += chunk;
                        });
                        res.on('end', function () {
                            var myData = JSON.parse(data2);
                            if (JSON.stringify(myData.total) !== '0') {
                                for (var i = 0; i < myData.total; i++) {
                                    if (myData.fares[i]) {
                                        var iatacodeDeparture = JSON.stringify(myData.fares[i].outbound.departureAirport.iataCode).substr(1, 3);
                                        var iatacodeArrival = JSON.stringify(myData.fares[i].outbound.arrivalAirport.iataCode).substr(1, 3);
                                        var Departuredateandtime = JSON.stringify(myData.fares[i].outbound.departureDate);
                                        var Departure_date = Departuredateandtime.split('T')[0].replace('"', '');
                                        var Departure_time = Departuredateandtime.split('T')[1].replace('"', '');
                                        var Arrivaldateandtime = JSON.stringify(myData.fares[i].outbound.arrivalDate);
                                        var Arrival_date = Arrivaldateandtime.split('T')[0].replace('"', '');
                                        var Arrival_time = Arrivaldateandtime.split('T')[1].replace('"', '');
                                        var price = parseInt(JSON.stringify(myData.fares[i].summary.price.value));
                                        var currencyCode = JSON.stringify(myData.fares[i].summary.price.currencyCode).substr(1, 3);
                                        price = price - (price * 0.2);
                                        var formattedPrice = currencyCode + price;
                                        var gate = Math.floor(Math.random() * 3) + 1;
                                        var num = Math.floor(Math.random() * 5000) + 4000;
                                        var aircraft = "A380";
                                        var available_seats = 100;
                                    }
                                    var sql = "INSERT INTO vols (num,departure,arrival,departure_date,arrival_date,departure_time,arrival_time,gate,price,aircraft,available_seats) VALUES ('" + num + "','" + iatacodeDeparture + "','" + iatacodeArrival + "','" + Departure_date + "','" + Arrival_date + "','" + Departure_time + "','" + Arrival_time + "','" + gate + "','" + formattedPrice + "','" + aircraft + "','" + available_seats + "')";
                                    connection.query(sql, function (err, result) {
                                        if (err) throw err;
                                    	console.log(result.insertId)
                                    });


                                }
                            }
                        });
                    });
            });
        });
    });
