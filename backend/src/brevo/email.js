import { apiInstance, sender } from "./brevo.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email`;
    const emailData = {
      sender: sender,
      to: recipient,
      subject: "Verify Your Email",
      htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ).replace("{verifyUrl}", verifyUrl),
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
    const LoginLink = `${process.env.CLIENT_URL}/login`;
    const emailData = {
      sender: sender,
      to: recipient,
      subject: "Welcome To ThunderCoil",
      htmlContent: WELCOME_EMAIL_TEMPLATE.replace("{username}", name).replace(
        "{LoginLink}",
        LoginLink,
      ),
    };

    const result = await apiInstance.sendTransacEmail(emailData);
    console.log("Welcome Email sent successfully.", result);
  } catch (error) {
    console.log(`Error sending welcome email: ${error}`);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];

  try {
    const emailData = {
      sender: sender,
      to: recipient,
      subject: "Password Reset",
      htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{RESET_LINK}",
        resetToken,
      ),
    };

    const result = await apiInstance.sendTransacEmail(emailData);
    console.log("Reset Email sends successfully", result);
  } catch (error) {
    console.log("Error in sendPasswordResetEmail controller: ", error);
    throw new Error("Error in sendPasswordResetEmail controller: ", error);
  }
};

export const sendResetSuccessEmail = async (email, name) => {
  const recipient = [{ email }];
  const loginLink = `${process.env.CLIENT_URL}/login`;

  try {
    const emailData = {
      sender: sender,
      to: recipient,
      subject: "Passoword Reset Successfully.",
      htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
        "{LOGIN_LINK}",
        loginLink,
      ).replace("{username}", name),
    };

    const result = await apiInstance.sendTransacEmail(emailData);
    console.log("Password reset email sent successfully", result);
  } catch (error) {
    console.log("Error in sendResetSuccessEmail", error);
    throw new Error("Error sending password reset success email: ", error);
  }
};
