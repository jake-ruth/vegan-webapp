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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationUserController = void 0;
const ApplicationUser_1 = require("../entities/ApplicationUser");
const RefreshTokenController_1 = require("./RefreshTokenController");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class ApplicationUserController {
}
exports.ApplicationUserController = ApplicationUserController;
ApplicationUserController.createApplicationUser = (applicationUser) => __awaiter(void 0, void 0, void 0, function* () {
    applicationUser.password = yield bcrypt.hash(applicationUser.password, 10);
    let existingUser = yield ApplicationUser_1.ApplicationUser.findOne({ where: { email: applicationUser.email } });
    if (existingUser)
        throw (new Error().message = 'User already exists with this email');
    return yield ApplicationUser_1.ApplicationUser.save(applicationUser);
});
ApplicationUserController.login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let applicationUser = yield ApplicationUser_1.ApplicationUser.findOne({ where: { email: email } });
    if (!applicationUser)
        throw (new Error().message = 'No user exists with this email');
    if (yield bcrypt.compare(password, applicationUser.password))
        return applicationUser;
    throw (new Error().message = 'Invalid password');
});
ApplicationUserController.logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield RefreshTokenController_1.RefreshTokenController.deleteRefreshToken(refreshToken);
});
ApplicationUserController.readOneApplicationUser = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ApplicationUser_1.ApplicationUser.findOne({ where: { uuid } });
});
ApplicationUserController.deleteApplicationUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ApplicationUser_1.ApplicationUser.delete(id);
});
ApplicationUserController.generateAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
});
ApplicationUserController.generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};
//# sourceMappingURL=ApplicationUserController.js.map