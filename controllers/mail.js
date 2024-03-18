const nodemailer = require('nodemailer');

const SEND_EMAIL = async (req) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'furnishing.3640@gmail.com',
            pass: 'lgqbbzvmvojdaiuv'
        }
    });

    console.log(req.body);

    var mailOptions = {
        from: '"FURNISHING" <furnishing.3640@gmail.com>',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    SEND_EMAIL
}

