export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">
        
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; color:#ffffff; padding:20px; text-align:center;">
              <h1 style="margin:0;">Email Verify App</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333;">
              <h2 style="margin-top:0;">Hello, User 👋</h2>
              
              <p style="font-size:16px; line-height:1.6;">
                Use the verification code below to verify your email:
              </p>

              <!-- OTP BOX -->
              <table cellpadding="0" cellspacing="0" align="center" style="margin:20px auto;">
                <tr>
                  
                    <td style="
                        border:1px solid #ddd;
                        padding:12px 18px;
                        font-size:20px;
                        font-weight:bold;
                        color:#4f46e5;
                        text-align:center;
                        border-radius:6px;
                        ">
                        {verificationCode}
                    </td>
                    <td width="5"></td>
                 
                </tr>
              </table>

              <!-- VERIFY BUTTON -->
              <table cellpadding="0" cellspacing="0" align="center" style="margin:25px auto;">
                <tr>
                  <td align="center">
                    <a href="{verifyUrl}"
                      style="
                        background:#4f46e5;
                        color:#ffffff;
                        padding:12px 25px;
                        text-decoration:none;
                        border-radius:6px;
                        display:inline-block;
                        font-size:16px;
                        font-weight:bold;
                      ">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; color:#666; text-align:center;">
                This code is valid for 10 minutes.
              </p>

              <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

              <p style="font-size:14px; color:#666;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
              © 2026 Your App Name. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Changed Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
    
    <h2 style="color:#28a745;">Password Updated Successfully ✅</h2>
    
    <p>Hello,{username}</p>
    
    <p>Your password has been successfully changed.</p>
    
    <p>If you made this change, no further action is needed.</p>
    
    <p style="color:red;"><b>If you did NOT make this change, please reset your password immediately.</b></p>
    
    <div style="text-align:center; margin:20px 0;">
      <a href="{LOGIN_LINK}" 
         style="background:#28a745; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
         Go to Login
      </a>
    </div>
    
    <hr />
    
    <p style="font-size:12px; color:#777;">
      Stay secure,<br/>
      Your App Team
    </p>
    
  </div>
</body>
</html>
`

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
    
    <h2 style="color:#333;">Reset Your Password 🔐</h2>
    
    <p>Hello,</p>
    
    <p>We received a request to reset your password.</p>
    
    <p>Click the button below to reset your password:</p>
    
    <div style="text-align:center; margin:20px 0;">
      <a href="{RESET_LINK}" 
         style="background:#007bff; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
         Reset Password
      </a>
    </div>
    
    <p>This link will expire in <b>10 minutes</b>.</p>
    
    <p>If you did not request this, you can safely ignore this email.</p>
    
    <hr />
    
    <p style="font-size:12px; color:#777;">
      Thanks,<br/>
      Your App Team
    </p>
    
  </div>
</body>
</html>
`

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">
        
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111827; color:#ffffff; padding:20px; text-align:center;">
              <h1 style="margin:0;">⚡ ThunderCoil</h1>
            </td>
          </tr>

          <!-- Banner Image -->
          <tr>
            <td align="center" style="padding:20px;">
              <img 
                src="https://plus.unsplash.com/premium_vector-1714618983809-692bb91f9a23?w=352&dpr=1&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" 
                alt="ThunderCoil"
                width="100%" 
                style="max-width:520px; border-radius:8px;"
              />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333;">
              
              <h2 style="margin-top:0;">Welcome, {username} 🎉</h2>
              
              <p style="font-size:16px; line-height:1.6;">
                We're excited to have you onboard at <strong>ThunderCoil</strong>.
                Your account has been successfully created and you're ready to go 🚀
              </p>

              <p style="font-size:16px; line-height:1.6;">
                You can now explore features, manage your account, and enjoy a seamless experience.
              </p>

              <!-- LOGIN BUTTON -->
              <table cellpadding="0" cellspacing="0" align="center" style="margin:30px auto;">
                <tr>
                  <td align="center">
                    <a href="{LoginLink}"
                      style="
                        background:#4f46e5;
                        color:#ffffff;
                        padding:14px 30px;
                        text-decoration:none;
                        border-radius:6px;
                        display:inline-block;
                        font-size:16px;
                        font-weight:bold;
                      ">
                      Login to Your Account
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; color:#666; text-align:center;">
                If you have any questions, feel free to contact our support team.
              </p>

              <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

              <p style="font-size:14px; color:#666;">
                Stay connected,<br/>
                <strong>ThunderCoil Team ⚡</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
              © 2026 ThunderCoil. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;