const axios = require('axios');
const Letter = require('../models/letter');
require('dotenv').config();

  exports.generateLetter = async (req, res) => { 

    const values = {
      name : req.body.name,
      designation : req.body.designation,
      from : req.body.from,
      to : req.body.to,
      email : req.body.email,
      currentDate : new Date().toDateString()
    };

    const data = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->\n\n\t<title>Invoice2</title>\n\n\t<!-- Bootstrap cdn 3.3.7 -->\n\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n\n\t<!-- Custom font montseraat -->\n\t<link href=\"https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700\" rel=\"stylesheet\">\n\n\t<!-- Custom style invoice1.css -->\n\t<link rel=\"stylesheet\" type=\"text/css\" href=\"./invoice2.css\">\n\n\t<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->\n    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->\n    <!--[if lt IE 9]>\n      <script src=\"https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js\"></script>\n<script src=\"https://oss.maxcdn.com/respond/1.4.2/respond.min.js\"></script>\n <![endif]-->\n</head>\n<body><div style='padding-top:50px; padding-bottom: 0px; padding-left: 20px; padding-right: 20px;'><div style='display: flex; justify-content: space-between;'><div style='display: flex;'><div><img src='https://i.postimg.cc/mrCRbnhq/Suvidha-Logo.png'/></div><div style='display: flex; flex-direction: column; align-items: center;'><h2 style='margin: 0;'>Suvidha Mahila Mandal</h2><p style='margin: 0;'>Registration No. MH/568/1995</p><p style='margin: 0;'>F No. 12669</p><p style='margin: 0;'>Registered Under the Society Act of 1860</p></div></div><div style='display: flex; flex-direction: column; align-items: center;'><p style='margin: 0;'>H. No. 1951, W.N.4, Khaperkheda,</p><p style='margin: 0;'>Saoner, Nagpur, Maharashtra, India</p><a href='mailto:info@suvidhafoundationedutech.org'>info@suvidhafoundationedutech.org</a><a href='www.suvidhafoundationedutech.org'>www.suvidhafoundationedutech.org</a></div></div><hr/><div style='display: flex; justify-content: space-between; margin-top: 20px;'><div>Date: ${values.currentDate}<p id='date-container'></p> </div><div></div></div><div style='width:100%; display:flex; justify-content: center;'><h2 style='margin: 0;'>INTERNSHIP: OFFER LETTER</h2></div><h4>To,</h4><h4><strong>${values.name} </strong></h4><p>With reference to your interview, we are pleased to inform you that you have been selected as <strong> “${values.designation} Intern” </strong>in our NGO - “Suvidha Mahila Mandal”, with the following terms and conditions.</p><ul><li>You will provide the <strong>Development services and apart from Web development you have to participate in the fundraising task also at Suvidha Foundation </strong>  and deliver the effect of the work.</li><li>The internship period will be from <strong> ${values.from} to ${values.to}. </strong></li><li>Your work base station is work from Home and six days a week.</li><li><strong>It is an unpaid internship.</strong>The certificate of completion will be given only if you invest 4 hours daily on all working days. You must participate in the daily team meetings through Google Meet. Also, the letter holds no value without a completion certificate from us with a unique identification number, which can be verified online.</li><li>During the internship period and thereafter, you will not give out to anyone in writing or by word of mouth or otherwise particulars or details of work process, technical know-how, research carried out, security arrangements and/or matters of confidential or secret nature which you may come across during your service in this organization.</li><li>In case of any misconduct which causes financial loss to the NGO or hurts its reputation and goodwill of the organization, the management has the right to terminate any intern. In case of termination, the management will not be issuing certificates to the intern.</li><li>It is necessary for an intern to return all the organization belongings (login credentials, media created, and system) at the time of leaving the organization. A clearance and experience certificate will be given after completing the formalities. If any employee leaves the job/Internship without completing the formality, the organization will take necessary action. All the software/courses/data developed by the interns or any employee for the Suvidha Mahila Mandal are intellectual property of the organization & are protected by Indian Copyright Act. All the data generated during the internship period, is the property right of organization and can be used for any purpose. In case of any piracy, strict legal action will be taken by the organization against erring persons. No information or source codes or course curriculum or business secrets or financial position or other details of organization shall be discussed among friends or relatives or our competitors. Such leakage of information is likely to cause financial loss to the organization. Hence, in such a case, the organization will be terminating the employee immediately and if required, further legal action will be taken against that intern</li></ul><div style='display: flex;justify-content: end;'><h5 style='margin: 0;'>Name :<strong> ${values.name} </strong> (      )</h5></div><div><img style='width: 200px;' src='https://i.postimg.cc/kGzqMPN0/Screenshot-2023-11-01-012029.jpg'/><p style='margin: 0; font-weight: bold;'>Mrs. Shobha Motghare</p><p style='margin: 0;'>Secretary, Suvidha Mahila Mandal</p></div></div></body>\n</html>`

    const options = {
      method: 'POST',
      url: process.env.PDF_API_URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.PDF_API,
        'X-RapidAPI-Host': 'html-to-pdf12.p.rapidapi.com'
      },
      data: {
        "html": data,
        format: 'pdf',
        ms_delay: 1000,
        pdf_options: { format: 'A4' }
      }
    };

    const { name, designation, from, to, uid, email } = req.body;
    const existingUser = await Letter.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username already exists' });
    } else {
      try {
        const response = await axios.request(options);
        const url = response.data.url
        const newUser = new Letter({
          name, designation, from, to, url, uid, email
        });          
        await newUser.save();
        res.status(200).json({"response" : "dfsdf"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating PDF' });
      }
  }
}
  

exports.getAllLetters = async (req, res) => {
  try {
    const users = await Letter.find().sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


exports.getLetterByEmail = async(req,res)=>{
  try {
    const email = req.params
    const users = await Letter.find(email); 
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}