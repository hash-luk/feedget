import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d30780fe3e4ff1",
    pass: "f17955eaa00c1b",
  },
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({subject,body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedGet <oi@feedget.com>",
      to: "Lucas Patrick <lucas.patrick2506@gmail.com>",
      subject: subject,
      html:body,
    });
  }
}
