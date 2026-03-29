import { apiInstance, sender } from "./brevo.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const emailData = {
      sender: sender,
      to: recipient,
      subject: "Verify Your Email",
      htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
    };

    const result = await apiInstance.sendTransacEmail(emailData);
    console.log("Verification email sent successfully.", result);
  } catch (error) {
    console.log(`Error sending verification email: ${error}`);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const emailData = {
      sender: sender,
      to: recipient,
      subject: "Welcome To ThunderCoil",
      htmlContent: WELCOME_EMAIL_TEMPLATE.replace("{username}", name),
    };

    const result = await apiInstance.sendTransacEmail(emailData);
    console.log("Welcome Email sent successfully.", result);
  } catch (error) {
    console.log(`Error sending welcome email: ${error}`);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};
