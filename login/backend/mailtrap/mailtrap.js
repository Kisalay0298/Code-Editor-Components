/*
import { MailtrapClient } from "mailtrap";

const TOKEN = "591d1b9676db3ef724550c5b2c492246";//0298mail
// const TOKEN = "0d8fcb68120f3ee296e68c057cd45048";  // 2767-email


export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  // email: "OCE@demomailtrap.com",
  email: "oce@demomailtrap.co",
  name: "Online Code Editor",
};
*/


import nodemailer from "nodemailer";

export const sender = {
  email: "kisalay@oce.com",
  name: "Online Code Editor",
};


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kisalaykomal0298@gmail.com",
    pass: "gnjg ydaj ppbr frnx",
  },
});

