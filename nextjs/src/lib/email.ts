
interface SendEmailProps {
  template: string;
  to: string;
}

export function sendEmail({ to }: SendEmailProps) {
  console.log('Sending email:', to);

  // Extend this to call an email API like Resend
}