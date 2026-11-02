import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.ZOHO_INFO_EMAIL,
    pass: process.env.ZOHO_INFO_PASS, 
  },
});

const sendMail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

export default sendMail;