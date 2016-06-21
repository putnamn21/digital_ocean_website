var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var sgTransport = require('nodemailer-sendgrid-transport');

// api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
var options = {
    auth: {
        api_key: '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'
    }
}

var mailer = nodemailer.createTransport(sgTransport(options));


module.exports = {
   sendEmail: function(message){
      
    return new Promise(function(resolve, reject){
       
         var messageBody = '<h3>Name: ';
         messageBody += message.Name;
         messageBody += '</h3>';
         messageBody += '<h3>Email: ';
         messageBody += message.Email;
         messageBody += '</h3>';
         messageBody += '<h3>Message:</h3>';
         messageBody += '<p>';
         messageBody += message.Message;
         messageBody += '</p>';

         var email = {
          to: ['nathanputnam2@gmail.com'],
          from: 'webmaster@nathan-putnam.me',
          subject: message.Subject,
          html: messageBody
         };

         mailer.sendMail(email, function(err, res) {
             if (err) { 
                console.log(err);
                reject('Message send unsuccessful. Try emailing nathanputnam2@gmail.com');
             }
                resolve('Message Successfully Sent!');
            }); 
    }); 
      
   }  
}