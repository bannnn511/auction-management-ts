import * as nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require('dotenv').config;

const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 25 || 465 || 687 || 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

class Email {
  message: object;

  constructor(
    from: string,
    to: string | string[],
    subject: string,
    text: string,
  ) {
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
        console.error(err);
      } else {
        console.log('📩', { 'Message send': info });
      }
    });
  }
}

export { Email };
