import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
import { mailtrapClient, sender } from './mailtrap.js'

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