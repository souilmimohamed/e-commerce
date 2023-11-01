import jwt from "jsonwebtoken";
import { UserModel } from "../models";

export interface jwtPayload {
  user_id: string;
  email: string;
  iat: number;
  exp: number;
}
export function generateToken(user: UserModel) {
  const token = jwt.sign(
    { user_id: user._id, email: user.email },
    String(process.env.TOKEN_KEY),
    { expiresIn: "24h" }
  );
  return token;
}

export function getHeaderFromToken(token: string) {
  const decodedToken = jwt.decode(token, {
    complete: true,
  });

  if (decodedToken) {
    return decodedToken.payload as jwtPayload;
  }
}
