import User from "../models/user.model.js";
import { decodeJWT } from "../helpers/generateJWT.helper.js";
import ExpressError from "../helpers/ExpressError.helper.js";

export async function getUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    req.user = null;
    return next();
  }

  const decoded = decodeJWT(token);

  if (!decoded) {
    req.user = null;
    return next();
  }

  try {
    const user = await User.findById(decoded._id);
    if (!user) {
      req.user = null;
      return next();
    }
    req.user = user;
  } catch {
    req.user = null;
  }

  return next();
}

export function requireAuth(req, res, next) {
  if (!req.user) throw new ExpressError(401, "User is not logged in");
  return next();
}

export function requireVerified(req, res, next) {
  if (!req.user || !req.user.isVerified)
    throw new ExpressError(403, "Forbidden: Unverified");
  return next();
}

export function requireNotVerified(req, res, next) {
  if (req.user && req.user.isVerified)
    throw new ExpressError(400, "You're already verified");
  return next();
}

export function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin)
    throw new ExpressError(403, "Forbidden: Admins Only");
  return next();
}
