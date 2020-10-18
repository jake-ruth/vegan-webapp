import { ApplicationUser } from '../entities/ApplicationUser';
import { RefreshTokenController } from './RefreshTokenController';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export class ApplicationUserController {
  static readAllApplicationUsers = async () => {
    return await ApplicationUser.find();
  };

  static createApplicationUser = async (applicationUser: ApplicationUser) => {
    applicationUser.password = await bcrypt.hash(applicationUser.password, 10);

    let existingUser = await ApplicationUser.findOne({where: {email: applicationUser.email}});

    if (existingUser) throw new Error().message = 'User already exists with this email';
    return await ApplicationUser.save(applicationUser);
  };

  static login = async (email: string, password: string) => {
    let applicationUser = await ApplicationUser.findOne({where: {email: email}});

    if (!applicationUser) throw new Error().message = 'No user exists with this email';

    if (await bcrypt.compare(password, applicationUser.password))return applicationUser; 
    
    throw new Error().message = 'Invalid password';
  }

  static logout = async (refreshToken: string) => {
    return await RefreshTokenController.deleteRefreshToken(refreshToken);
  }

  static readOneApplicationUser = async (id: number) => {
    return await ApplicationUser.findOne(id);
  }

  static generateAccessToken = async (user: any) => {
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  };

  static generateRefreshToken = (user: any) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  };
}
