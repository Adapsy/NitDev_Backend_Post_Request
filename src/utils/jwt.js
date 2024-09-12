import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
export const generateToken = async (userdetails) => {
	const token = jwt.sign(userdetails, config.Auth.accessTokenSecretKey, {
		expiresIn: config.Auth.accessTokenExpire,
	});
};
