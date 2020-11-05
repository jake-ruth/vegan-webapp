"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationUserController_1 = require("../controllers/applicationUserController");
const ApplicationUser_1 = require("../entities/ApplicationUser");
const body_parser_1 = __importDefault(require("body-parser"));
const authentication_1 = require("../middleware/authentication");
const RefreshTokenController_1 = require("../controllers/RefreshTokenController");
const express = require('express');
const router = express.Router();
router.use(body_parser_1.default.json());
// Register a new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    let newUser = new ApplicationUser_1.ApplicationUser();
    newUser.email = body.email;
    newUser.password = body.password;
    newUser.firstName = body.firstName;
    newUser.lastName = body.lastName;
    newUser.bio = body.bio;
    try {
        yield applicationUserController_1.ApplicationUserController.createApplicationUser(newUser);
        return res.status(201).json({ message: 'User Created' });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}));
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield applicationUserController_1.ApplicationUserController.login(body.email, body.password);
        let accessToken = yield applicationUserController_1.ApplicationUserController.generateAccessToken(req.body);
        let refreshToken = yield applicationUserController_1.ApplicationUserController.generateRefreshToken(req.body);
        yield RefreshTokenController_1.RefreshTokenController.addRefreshToken(refreshToken);
        return res.status(200).json({ accessToken, refreshToken });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}));
//Logout
router.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield applicationUserController_1.ApplicationUserController.logout(req.body.refreshToken);
        return res.sendStatus(200);
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}));
//Get single user
router.get('/getApplicationUser/:id', authentication_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicationUser = yield applicationUserController_1.ApplicationUserController.readOneApplicationUser(Number(req.params.id));
        return res.send(applicationUser).status(200);
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}));
//Delete user by id
router.delete('/deleteApplicationUser', authentication_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield applicationUserController_1.ApplicationUserController.deleteApplicationUser(req.body.id);
        return res.sendStatus(200);
    }
    catch (err) {
        return res.sendStatus(500).json({ error: err });
    }
}));
module.exports = router;
//# sourceMappingURL=applicationUserRoutes.js.map