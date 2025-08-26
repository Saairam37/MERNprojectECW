const User = require("../../models/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const passwordControllers = {
    resetPassword: async (req, res) => {
        try {

            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User does not exist' });
            }
            const token = crypto.randomBytes(20).toString('hex');
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
            await user.save();

            console.log("Generated token:", token);
            console.log("User before save:", user);


            const resetLink = `https://mernprojectecw-fe.onrender.com/reset-password/${token}`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            })


            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Reset your password',
                html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>This link will expire in 1 hour.</p>`
            });


            res.status(200).json({ message: 'Password reset link sent to your email' });
        }
        catch (err) {
            res.status(500).json({ message: `There is an error in reseting password : ${err.message}` })
        }
    },
    resetPasswordConfirm: async (req, res) => {
        try {

            const { token } = req.params;
            const { password } = req.body;

            console.log("Incoming password:", password);

            const user = await User.findOne({
                resetToken: token,
                resetTokenExpiration: { $gt: Date.now() },
            });

            console.log("User found:", user);
            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            user.password = await bcrypt.hash(password, 10);
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;

            await user.save();

            res.status(200).json({ success: true, message: 'Password has been reset successfully' });
        } catch (err) {
            res.status(500).json({ message: `Error reseting password: ${err.message}` });
        }
    }

}

module.exports = passwordControllers;