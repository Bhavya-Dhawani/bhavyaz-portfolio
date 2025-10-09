import { Router } from 'express';
import wrapAsync from '../helpers/wrapAsync.helper.js';
import {
    handleForgotPassword,
    handleGoogleAuth,
    handleLogin,
    handleLogout,
    handleRegister,
    handleResetPassword,
    handleSendVerification,
    handleStatus,
    handleVerifyEmail
} from '../controllers/user.controller.js';

import {
    requireAuth,
    requireNotVerified
} from '../middlewares/auth.middlewares.js'

const router = Router();

router.get("/status", wrapAsync(handleStatus));

router.post("/register", wrapAsync(handleRegister));

router.post(
    "/send-verification",
    requireAuth,
    requireNotVerified,
    wrapAsync(handleSendVerification)
);

router.post(
    "/verify-email",
    requireAuth,
    requireNotVerified,
    wrapAsync(handleVerifyEmail)
);

router.post("/login", wrapAsync(handleLogin));

router.post("/logout", wrapAsync(handleLogout));

router.post("/forgot-password", wrapAsync(handleForgotPassword));

router.post("/reset-password/:resetToken", wrapAsync(handleResetPassword));

router.get("/google/callback", wrapAsync(handleGoogleAuth));

export default router;