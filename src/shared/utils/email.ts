import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 25 || 465 || 687 || 2525,
  auth: {
    user: process.env.NODEMAILER_USER || '6e4838306021a8',
    pass: process.env.NODEMAILER_PASS || 'a9ed0a17483e43',
  },
});

class Email {
  message: object;

  constructor(from: string, to: string[], subject: string, text: string) {
    this.message = {
      from,
      to,
      subject,
      text,
    };
  }

  send() {
    transport.sendMail(this.message, (err: Error | null, info: object) => {
      if (err) {
        console.log(err);
      } else {
        console.log('📩', { 'Message send': info });
      }
    });
  }
}

export { Email };
