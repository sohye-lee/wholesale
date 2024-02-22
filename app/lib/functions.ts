import nodemailer from "nodemailer";
import { EmailOptions, Profile } from "./types";

// Function 'sendEmail' :  sends 3 different kinds of verification emails
const generateEmailTransport = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "24d1b62fbb8a5d",
      pass: "d9c73e0f1697d3",
    },
  });
  return transport;
};

const send = async (profile: Profile, html: string) => {
  const transport = generateEmailTransport();

  await transport.sendMail({
    from: "verification@claviswholesale.com",
    to: profile.email,
    html,
  });
};

export const sendEmail = ({ profile, subject, linkUrl }: EmailOptions) => {
  let html;
  switch (subject) {
    case "verification":
      html = `<p>Please verify your email by clicking <a href="${linkUrl}">this link</a></p>`;
      send(profile, html);
      break;
    case "forgot-password":
      html = `<p>To reset your password, please open <a href="${linkUrl}">this link</a> and update your password.</p>`;
      send(profile, html);
      break;
    case "password-changed":
      html = `<p>Your password has been successfully updated. Please login <a href="${
        process.env.NEXTAUTH_URL + "/auth/login"
      }">here</a> </p>`;
      send(profile, html);
      break;
  }
};

const fetcher = (...args:any) => fetch(...args).then(res => res.json())