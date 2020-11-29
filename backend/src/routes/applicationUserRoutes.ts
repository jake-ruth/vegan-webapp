export {};
import { Request, Response } from 'express';
import { ApplicationUserController } from '../controllers/ApplicationUserController';
import { ApplicationUser } from '../entities/ApplicationUser';
import bodyParser from 'body-parser';
import { authenticateToken } from '../middleware/authentication';
import { RefreshTokenController } from '../controllers/RefreshTokenController';
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  const body = req.body;

  let newUser: ApplicationUser = new ApplicationUser();
  newUser.email = body.email;
  newUser.password = body.password;
  newUser.firstName = body.firstName;
  newUser.lastName = body.lastName;
  newUser.bio = body.bio;

  try {
    await ApplicationUserController.createApplicationUser(newUser);
    return res.status(201).json({ message: 'User Created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const user: any = await ApplicationUserController.login(body.email, body.password);

    let accessToken = await ApplicationUserController.generateAccessToken(req.body);
    let refreshToken = await ApplicationUserController.generateRefreshToken(req.body);

    await RefreshTokenController.addRefreshToken(refreshToken);

    delete user.password;

    return res.status(200).json({ accessToken, refreshToken, user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Logout
router.delete('/logout', async (req: Request, res: Response) => {
  try {
    await ApplicationUserController.logout(req.body.refreshToken);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Get single user
router.get('/getApplicationUser/:uuid', authenticateToken, async (req: Request, res: Response) => {
  try {
    const applicationUser = await ApplicationUserController.readOneApplicationUser(req.params.uuid);
    return res.send(applicationUser).status(200);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Delete user by id
router.delete('/deleteApplicationUser', authenticateToken, async (req: Request, res: Response) => {
  try {
    await ApplicationUserController.deleteApplicationUser(req.body.id);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500).json({ error: err });
  }
});

//Generate new access token from refresh token
router.post('/token', async (req: any, res: any) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === null) return res.sendStatus(401);
  //Do we have a valid refresh token?

  const refreshTokenFromDb = await RefreshTokenController.readRefreshToken(refreshToken);
  if (refreshTokenFromDb === null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err: any, user: any) => {
    if (err) return res.sendStatus(401);
    const tokenData = { email: user.email };
    const accessToken = await ApplicationUserController.generateAccessToken({ name: user.firstName });
    res.json({ accessToken: accessToken });
  });
});

//Does the token match the requested user ID?
router.post('/authenticate', authenticateToken, async (req: any, res: any) => {
  res.json({ authenticated: req.body.userId == req.body.user.id });
});

module.exports = router;
