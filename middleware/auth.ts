import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.ts";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
  role?: string;
}

const auth = async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  //   const authHeader = req.headers.authorization;

  //   if (!authHeader || !authHeader.startsWith("Bearer")) {
  //     throw new UnauthenticatedError("Authentication Invalid");
  //   }
  //   const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = { userId: payload.userId, role: payload.role || 'leader' };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
