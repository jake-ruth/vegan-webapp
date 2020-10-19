export {};
import { Request, Response } from 'express';
import { ApplicationUserController } from '../controllers/ApplicationUserController';
import { ApplicationUser } from '../entities/ApplicationUser';
import bodyParser from 'body-parser';
import { authenticateToken } from '../middleware/authentication';
import { RefreshTokenController } from '../controllers/RefreshTokenController';

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

        await RefreshTokenController.addRefreshToken(refreshToken);

        return res.status(200).json({ accessToken, refreshToken});
    } catch (err){
        return res.status(500).json({error: err});
    }
});

//Logout
router.delete('/logout', async (req: Request, res: Response) => {
    try {
        await ApplicationUserController.logout(req.body.refreshToken);
        return res.sendStatus(200);
    } catch(err){
        return res.status(500).json({error: err});
    }
})


//Get single user
router.get('/getApplicationUser/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const applicationUser = await ApplicationUserController.readOneApplicationUser(Number(req.params.id));     
        return res.send(applicationUser).status(200);
    } catch (err) {
        return res.status(500).json({error: err});
    }
})

//Delete user by id
router.delete('/deleteApplicationUser', authenticateToken, async (req: Request, res: Response) => {
    try {
        await ApplicationUserController.deleteApplicationUser(req.body.id);
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500).json({error: err});
    }
})

module.exports = router;
