/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var mysql = __webpack_require__(5);
var https = __webpack_require__(1);

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'letsfly',
    multipleStatements: 'true'

});

module.exports = {
    letsFlyFlights: function (depart,destination,date,callback) {
        connection.query('SELECT * FROM vols WHERE ' +
            "departure='"+depart+"' and arrival='"+destination+"' and departure_date='"+date+"'",(err, result) => {
            if( err ) callback(err,null);
            callback(null,result);
        });
    },
    connection: connection
};

module.exports.db = connection;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(0);
let index = __webpack_require__(4);
let search = __webpack_require__(6);
let result = __webpack_require__(7);
let app = express();
let cors = __webpack_require__(9);
const bodyParser = __webpack_require__(10);
let swagger = __webpack_require__(11);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'));

app.use(cors({
    origin: true,
    credentials: true
}));


/* Routes */

app.use('/', index);
app.use('/', search);
app.use('/', result);
app.use("/swagger", swagger.subpath);

app.listen(swagger.port);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(0);
const router = express.Router();
const con = __webpack_require__(2);


/* GET home page. */
router.get("/", (req, resp) => {
    resp.end(con.allflights());
});

module.exports = router;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(0);
const https = __webpack_require__(1);
const router = express.Router();

/* GET home page. */
router.post("/airports", (req, resp) => {

    https.get("https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json", function(res){
        var body = '';
        
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
            var fbResponse = JSON.parse(body);
            resp.end(JSON.stringify(fbResponse));
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });

});


module.exports = router;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(0);
const https = __webpack_require__(1);
const router = express.Router();
const axios = __webpack_require__(8);
const db = __webpack_require__(2);


router.post('/getOtherCompaniesFlights', function (request, res) {
    var date    = request.body.date;
    var origin  = request.body.depart;
    var dest    = request.body.destination;

    axios.post('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDEJh3JYDQ0cJE4-v-Srd9y2kjPVcA3mhE', {
            "request": {
                "slice": [
                    {
                        "origin": origin,
                        "destination": dest ,
                        "date": date,
                        "maxStops": 0,
                    }
                ],
                "passengers": {
                    "adultCount": 1,
                    "infantInLapCount": 0,
                    "infantInSeatCount": 0,
                    "childCount": 0,
                    "seniorCount": 0
                },
                "solutions": 150,
                "refundable": false
            }
        })
        .then(function (response) {

            let Data = response["data"]["trips"]["tripOption"];
            let DataCompany = response["data"]["trips"]["data"]["carrier"];
            let SendData = [];

            for (var i in Data) {
                for (var j in DataCompany) {
                    if (Data[i]["slice"][0]["segment"][0]['flight']['carrier'] == DataCompany[j]["code"])
                        SendData.push({
                            flightcarrier: Data[i]["slice"][0]["segment"][0]['flight']['carrier'],
                            carriername: DataCompany[j]["name"],
                            flightnumber: Data[i]["slice"][0]["segment"][0]['flight']['number'],
                            arrivalTime: Data[i]["slice"][0]["segment"][0]["leg"][0]["arrivalTime"],
                            departureTime: Data[i]["slice"][0]["segment"][0]["leg"][0]["departureTime"],
                            origin: Data[i]["slice"][0]["segment"][0]["leg"][0]["origin"],
                            destination: Data[i]["slice"][0]["segment"][0]["leg"][0]["destination"],
                            terminal: Data[i]["slice"][0]["segment"][0]["leg"][0]["destinationTerminal"],
                            duration: Data[i]["slice"][0]["segment"][0]["leg"][0]["duration"],
                            totalprice: Data[i]["pricing"][0]["saleTotal"]
                        });
                }



            }
            
            res.send(SendData);
        })
        .catch(function (error) {
            res.send(false);
        });



});

router.post('/getLetsFlyFlights', (request,res) => {
    let departure_date = request.body.departure_date;
    let back_date = request.body.back_date;
    let depart = (request.body.depart).substr(0,3);
    let destination = (request.body.destination).substr(0,3);

    db.letsFlyFlights(depart,destination,departure_date, (err, aller) => {
        if(err) throw new Error(err);
        if(back_date != '0000-00-00')
            db.letsFlyFlights(destination,depart,back_date, (err, retour) => {
                if(err) throw new Error(err);
                let result = {
                    aller: aller,
                    retour: retour
                };
                res.send(JSON.stringify(result));
            });
        else {
            let result = {
                aller: aller,
            };
            res.send(JSON.stringify(result));
        }
    });
});

module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(0);
var argv = __webpack_require__(12)(process.argv.slice(2));
var subpath = __webpack_require__(13);
var swagger = __webpack_require__(14).createNew(subpath);


swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});

swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');

// Configure the API port
var port = 8081;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.');

// Set and display the application URL
console.log('snapJob API running on http://' + domain + ':' + port);


swagger.configure('http://' + domain + ':' + port, '1.0.0');


module.exports.swagger = swagger;
module.exports.subpath = subpath;
module.exports.port = port;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("minimist");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const express = __webpack_require__(0);
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../dist' });
});

module.exports = router;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ })
/******/ ]);