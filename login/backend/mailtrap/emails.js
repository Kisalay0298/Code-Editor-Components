import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, WELCOME_MESSAGE } from './emailTemplates.js'
import { transporter, sender } from './mailtrap.js'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



/*
export const sendVerificationEmail = async (email, verificationToken) =>{
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully :)",response)
    } catch (error) {
        console.log("Error sending verification code", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}
*/

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
      const response = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: recipient.map(r => r.email).join(", "),
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        headers: {
          'X-Category': 'Email Verification'
        }
      });
    } catch (error) {
      console.log("Error sending verification email ❌", error);
      throw new Error(`Error sending verification email: ${error}`);
    }
};

/*
export const sendWelcomeEmail = async (email, name)=>{
    const recipient = [{email}]
    try {
        
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "2a75528c-1ca0-4545-929b-6b48f79a46a3",
            // template_uuid: "f5391668-a965-44e8-b3bf-58f0c960b263",
            template_variables: {
                // company_info_name: "company name" // i removed from the mail template
                name: name
            }
        })
        console.log("Welcome Email sent successfully :) ",response)
    } catch (error) {
        console.log("Error sending welcome email", error);
        throw new Error (`Error sending welcome email: ${error}`)
    }
}
*/


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
  
    try {
      const response = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: recipient.map(r => r.email).join(", "), // format to string for nodemailer
        subject: "Welcome to Online Code Editor 🎉",
        html: WELCOME_MESSAGE.replace("{name}", name),
        attachments: [{
          filename: 'logo.png',
          path: path.join(__dirname, 'logo.png'),
          cid: 'logo'
        }]
      });
    } catch (error) {
      console.log("Error sending welcome email 😞", error);
      throw new Error(`Error sending welcome email: ${error}`);
    }
};

/*
export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

    } catch (error) {
        console.log('Error sending password reset  email', error)
        throw new Error(`Error sending password reset email: ${error}`)
    }
}
*/

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
      const response = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: recipient.map(r => r.email).join(", "),
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        headers: {
          'X-Category': 'Password Reset'
        }
      });
    } catch (error) {
      console.log("Error sending password reset email ❌", error);
      throw new Error(`Error sending password reset email: ${error}`);
    }
};

/*
export const sendResetSuccessEmail = async (email)=>{
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        console.log("Password Reset Success Email sent successfully :) ",response)
    }catch(err){
        console.log("Error sending password reset success email", err);
        throw new Error(`Error sending password reset success email: ${err}`)
    }
}
*/

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
      const response = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: recipient.map(r => r.email).join(", "),
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        headers: {
          'X-Category': 'Password Reset'
        }
      });
    } catch (err) {
      console.log("Error sending password reset success email ❌", err);
      throw new Error(`Error sending password reset success email: ${err}`);
    }
};