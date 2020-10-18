export {};
import { Request, Response } from 'express';
import { ApplicationUserController } from '../controllers/ApplicationUserController';
import { ApplicationUser } from '../entities/ApplicationUser';
import bodyParser from 'body-parser';
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
      return res.status(201).json({ message: "User Created"});
    } catch (err){
        return res.status(500).json({error: err});
    }
});



// Login
router.post('/login', async (req: Request, res: Response) => {
    const body = req.body;

    try {
        await ApplicationUserController.login(body.email, body.password);

        let accessToken = await ApplicationUserController.generateAccessToken(req.body);
        let refreshToken = await ApplicationUserController.generateRefreshToken(req.body);

        return res.status(200).json({ accessToken, refreshToken});
    } catch (err){
        return res.status(500).json({error: err});
    }
})

module.exports = router;
