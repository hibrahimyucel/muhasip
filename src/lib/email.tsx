"use server";

import nodemailer from "nodemailer";

export type emailData = {
  name: string | null;
  email: string;
  subject: string;
  description: string;
};
export async function sendEmail(value: emailData) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: value.email,
      subject: value.subject,
      html:
        "<p>Hello " +
        value.name +
        "</p><h2>" +
        value.subject +
        "</h2><p>" +
        value.description +
        "</p>",
    });
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send email." };
  }
}
