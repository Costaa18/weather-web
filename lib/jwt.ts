import jwt from 'jsonwebtoken';

export const sign = (payload: any, options: jwt.SignOptions) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, options);
};