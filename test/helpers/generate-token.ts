import { JwtService, JwtSignOptions } from '@nestjs/jwt';

export const generateToken = (payload: any) => {
  const jwt = new JwtService();
  const jwtOptions: JwtSignOptions = {
    secret: process.env.JWT_SECRET,
    expiresIn: '1m',
  };
  return jwt.sign(payload, jwtOptions);
};
