const nodemailer = require('nodemailer');
const express = require('express');
const Letter = require('../models/letter');
const app = express();

// Middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASS, 
    },
  });

  const format =` Dear Intern,

  Greetings of the day.
  
  Congratulations on your offer from Suvidha Foundation!
  Please find the attached - detailed offer letter.
  
  For the process of acceptance, Please revert back the physically signed copy of the Offer Letter within 48 hours.
  Email us here back:-
  hr@suvidhafoundationedutech.org
  
  After Successful Completion of your internship, You will be Awarded with "Certificate of Completion" And on the basis of your Performance "Letter of Recommendation".
  
  We are looking forward to hearing from you and hope you’ll join our
  team!
  
  Best regards,
  
  Sonal Godshelwar
  Human Resource Team
  Mail: suvidhafoundation00@gmail.com
  Suvidha Foundation
  R. No: MH/568/95/Nagpur
  H.No. 1951, W.N.4, Khaperkheda, Saoner, Nagpur
  Email:
  info@suvidhafoundationedutech.org
  Phone No: +918378042291`

exports.sendEmail = async (req, res) => {
    const { recipientEmail, pdfUrl, name } = req.body;
    const mailOptions = {
      from: process.env.EMAIL, // Sender's email address
      to: recipientEmail, // Recipient's email
      subject: 'Suvidha Offer Letter', // Email subject
      text: format, 
      attachments: [
        {
          filename: `${name}.pdf`, 
          path: pdfUrl,
        },
      ],
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      await Letter.findOneAndUpdate(
        { email: recipientEmail }, // Find the record by email
        { emailSent: true }, // Update the emailSent field to true
      );

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
}