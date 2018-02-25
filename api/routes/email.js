let express = require( "express" );

path = require( "path" );
bodyParser = require( "body-parser" );
fs = require( "fs" );
https = require( "https" );
router = express.Router();

nodemailer = require( "nodemailer" );
username = "lets.fly.companie@gmail.com";
pass = "letsfly0000";


router.post( "/sendEmail", ( req, res ) => {
    let travler = req.body.travler;
    console.log(travler);
    let content = '';

    if(travler.bookid_retour) {
        content = '<div style="color:#444;font-size:18px;">Bonjour,<br/> Merci de votre réservation<br/><br/><br/>'+
        'Voici le Récapitulatif de votre voyage: <br/><br/><br/> '+
        'Reservation ID aller: '+ travler.bookid_aller + ' <br/>'+
        'Reservation ID retour: '+ travler.bookid_retour+ ' <br/>'+        
        'Departure: '+ travler.aller.departure + ' <br/>'+
        'Arrival: '+ travler.aller.arrival + ' <br/>'+
        'Date of flight: '+ travler.aller.departure_date + ' <br/>'+
        'Arrival time: '+ travler.aller.arrival_time + ' <br/>'+
        'Price: '+ travler.aller.price + ' <br/>'+
        'Aircraft: '+ travler.aller.aircraft + ' <br/>'+
       // 'Numero de réservation: '+ travler.client + ' <br/>'+
        //travler.client.toString() + ' <br/>'+
        'Merci de choisir notre companie. <br/>Let\'s Fly vous souhaite un agréable voyage! <br/><br/>L\'équipe Let\'s Fly</div>';
    } else {
        content = '<div style="color:#444;font-size:18px;">Bonjour,<br/> Merci de votre réservation<br/><br/><br/>'+
        'Voici le Récapitulatif de votre voyage: <br/><br/><br/> '+
        'Reservation ID: '+ travler.bookid_aller + ' <br/>'+
        'Departure: '+ travler.aller.departure + ' <br/>'+
        'Arrival: '+ travler.aller.arrival + ' <br/>'+
        'Date of flight: '+ travler.aller.departure_date + ' <br/>'+
        'Arrival time: '+ travler.aller.arrival_time + ' <br/>'+
        'Price: '+ travler.aller.price + ' <br/>'+
        'Aircraft: '+ travler.aller.aircraft + ' <br/>'+
       // 'Numero de réservation: '+ travler.client + ' <br/>'+
        //travler.client.toString() + ' <br/>'+
        'Merci de choisir notre companie. <br/>Let\'s Fly vous souhaite un agréable voyage! <br/><br/>L\'équipe Let\'s Fly</div>';
    }

    let transporter = nodemailer.createTransport( {
            "service": "gmail",
            "auth": {
                "user": username,
                "pass": pass
            }
        } ),


        mailOptions = {
            "from": "Let's Fly",
            "to": travler.client.email,
            "subject": "Confirmation de réservation",
            "html": content
        /* attachments: [{
        filename: 'reservation.pdf',
        path: __dirname+'/reservation.pdf',
        contentType: 'application/pdf'
        }]*/
        };
    
    
    transporter.sendMail( mailOptions, ( error, info ) => {
        if ( error ) {
            throw new Error( err );
        } else {
            res.send( info );
        }
    } );

} );


module.exports = router;

