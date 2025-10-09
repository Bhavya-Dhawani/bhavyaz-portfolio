import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import ExpressError from "../helpers/ExpressError.helper.js";
import {
    generateAndSetJWT,
    generateVerificationToken,
    generateResetPasswordToken,
} from "../helpers/generateJWT.helper.js";
import { sanitizeUser } from "../helpers/sanitise.helper.js";
import getGoogleOAuthTokens from "../helpers/getGoogleOuth.helper.js";

import jwt from "jsonwebtoken";

import {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendForgotPasswordEmail,
    sendResetPasswordEmail,
} from "../helpers/mails.helper.js";

// ---------------- STATUS ----------------
export async function handleStatus(req, res, next) {
    if (!req.user) throw new ExpressError(401, "User is not logged in");

    res.status(200).json({
        success: true,
        message: "User is logged in",
        data: {
            user: sanitizeUser(req.user),
        },
    });
}

// ---------------- REGISTER ----------------
export async function handleRegister(req, res, next) {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if (existingUser.googleId && !existingUser.password) {
            existingUser.name = name || existingUser.name;
            existingUser.password = password;

            await existingUser.save();
            generateAndSetJWT(res, existingUser._id);

            res.status(200).json({
                success: true,
                message: "User registered successfully",
                data: { user: sanitizeUser(existingUser) },
            });
            return;
        } else {
            throw new ExpressError(400, "User already exists");
        }
    }

    const verificationToken = generateVerificationToken();
    await sendVerificationEmail(email, verificationToken);

    const newUser = new User({
        name,
        email,
        phone,
        password,
    });
    await newUser.save();

    const newToken = new Token({
        value: verificationToken,
        user_id: newUser._id,
        type: "verification",
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
    });
    await newToken.save();

    generateAndSetJWT(res, newUser._id);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            user: sanitizeUser(newUser),
        },
    });
}

// ---------------- SEND VERIFICATION ----------------
export async function handleSendVerification(req, res, next) {
    const user = req.user;

    const existingToken = await Token.findOne({
        user_id: user._id,
        type: "verification",
    });

    const newVerificationToken = generateVerificationToken();
    await sendVerificationEmail(user.email, newVerificationToken);

    if (existingToken) {
        existingToken.value = newVerificationToken;
        existingToken.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await existingToken.save();
    } else {
        const newToken = new Token({
            value: newVerificationToken,
            user_id: user._id,
            type: "verification",
            expiresAt: Date.now() + 60 * 60 * 1000,
        });
        await newToken.save();
    }

    res.status(201).json({
        success: true,
        message: "Verification code sent successfully",
    });
}

// ---------------- VERIFY EMAIL ----------------
export async function handleVerifyEmail(req, res, next) {
    const { code } = req.body;
    const user = req.user;

    const token = await Token.findOne({
        value: code,
        user_id: user.id,
        type: "verification",
    });

    if (!token || token.expiresAt < new Date())
        throw new ExpressError(400, "Invalid or expired token");

    user.isVerified = true;
    await user.save();
    await token.deleteOne();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
        success: true,
        message: "Email verified successfully",
        data: {
            user: sanitizeUser(user),
        },
    });
}

// ---------------- LOGIN ----------------
export async function handleLogin(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ExpressError(400, "User does not exist");

    const isValid = await user.comparePassword(password);
    if (!isValid) throw new ExpressError(400, "Invalid credentials");

    generateAndSetJWT(res, user._id);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            user: sanitizeUser(user),
        },
    });
}

// ---------------- LOGOUT ----------------
export async function handleLogout(req, res, next) {
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
}

// ---------------- FORGOT PASSWORD ----------------
export async function handleForgotPassword(req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ExpressError(400, "User does not exist");

    const resetToken = generateResetPasswordToken();

    const newToken = new Token({
        value: resetToken,
        user_id: user._id,
        type: "reset",
        expiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
    });

    await newToken.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendForgotPasswordEmail(email, resetUrl);

    res.status(200).json({
        success: true,
        message: "Reset Password Link sent successfully.",
    });
}

// ---------------- RESET PASSWORD ----------------
export async function handleResetPassword(req, res, next) {
    const { resetToken } = req.params;
    const { password } = req.body;

    const token = await Token.findOne({ value: resetToken });
    if (!token || token.expiresAt < new Date())
        throw new ExpressError(400, "Invalid or expired token");

    const user = await User.findOne({ _id: token.user_id });
    if (!user) throw new ExpressError(400, "User does not exist");

    user.password = password;
    await user.save();
    await token.deleteOne();

    await sendResetPasswordEmail(user.email);

    res.send({
        success: true,
        message: "Password reset successful",
    });
}

// ---------------- GOOGLE AUTH ----------------
export async function handleGoogleAuth(req, res, next) {
    const code = req.query.code;

    try {
        const obj = await getGoogleOAuthTokens(code);
        const googleUser = jwt.decode(obj.id_token);

        if (!googleUser || !googleUser.email) {
            throw new ExpressError(400, "Unable to get user info from Google.");
        }

        let user = await User.findOne({
            $or: [{ googleId: googleUser.sub }, { email: googleUser.email }],
        });

        if (!user) {
            user = new User({
                name: googleUser.name || googleUser.email,
                email: googleUser.email,
                googleId: googleUser.sub,
                isVerified: true,
            });

            await user.save();
            await sendWelcomeEmail(user.email, user.name);
        } else if (!user.googleId) {
            user.isVerified = true;
            user.googleId = googleUser.sub;
            await user.save();
        }

        generateAndSetJWT(res, user._id);
        res.redirect(process.env.CLIENT_URL);
    } catch (err) {
        console.error(`Google Auth error : ${err}`);
        res.redirect(process.env.CLIENT_URL);
    }
}
