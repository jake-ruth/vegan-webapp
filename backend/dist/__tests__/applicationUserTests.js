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
const typeorm_1 = require("typeorm");
const ApplicationUserController_1 = require("../controllers/ApplicationUserController");
const ApplicationUser_1 = require("../entities/ApplicationUser");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getConnection().close();
}));
let appUser = new ApplicationUser_1.ApplicationUser();
appUser.email = 'testemail@email.com';
appUser.password = 'test';
appUser.firstName = 'Test';
appUser.lastName = 'LastName';
appUser.bio = 'Test bio';
describe('User Tests', () => {
    it('should create user record in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ApplicationUserController_1.ApplicationUserController.createApplicationUser(appUser);
            expect(result.email).toBe(appUser.email);
        }
        catch (err) {
            console.log('ERR: ', err);
        }
    }));
    it('should log in the user', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield ApplicationUserController_1.ApplicationUserController.login(appUser.email, 'test');
        expect(result.email).toBe(appUser.email);
    }));
    it('should read user by uuid', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield ApplicationUserController_1.ApplicationUserController.readOneApplicationUser(appUser.uuid);
        expect(result === null || result === void 0 ? void 0 : result.email).toBe(appUser.email);
    }));
    //This is just to clean up, doesn't test a function that's used
    it('should delete test user from database', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield ApplicationUser_1.ApplicationUser.findOne({ where: { email: appUser.email } });
        let result = yield ApplicationUser_1.ApplicationUser.delete(user.id);
        expect(result);
    }));
});
//# sourceMappingURL=applicationUserTests.js.map