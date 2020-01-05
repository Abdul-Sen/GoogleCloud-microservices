// dependencies
const nodemailer = require("nodemailer");
const cors = require('cors');

// Business logic function
var sendMessageFn = function sendMessageFn(req,res){
  
 
  console.log("===================================");
  console.log(req.get('origin'));
  console.log("===================================");
  console.log(req.body);
  console.log("===================================");
  
 let userSubject = req.body.subject || req.query.subject || 'AUTOMATED EMAIL: no subject given';
 let userMessage = req.body.message || req.query.message || 'AUTOMATED EMIAL: no body message';

  // Auth of transport account
    let transporter = nodemailer.createTransport({
 		service: 'gmail',
 		auth: {
        	user: process.env.FROM,
        	pass: process.env.FROMACCESS
    	}
  	});
  
  // Mail setup
  const mailOptions = {
  from: process.env.FROM, // sender address
  to: process.env.TO, // list of receivers
  subject: userSubject, // Subject line
  html: ('<p>'+ userMessage + '</p>')// plain text body
};
  
  // Delivery
  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
	});
  
  res.status(200).send("data recieved");
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.sendMessage = (req, res) => { // Main input
  
  var corsOptions = {
 	 origin: ["http://localhost:3000","https://abdul-sen.github.io"],
  	 optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	};

  var corsFn = cors(corsOptions); //Cors wrapper to allow cross domain access without allowing everyone
  corsFn(req,res, function(){
    sendMessageFn(req,res);
  });
  
};