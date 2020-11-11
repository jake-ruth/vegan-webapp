// import { ApplicationUser } from "../entities/ApplicationUser";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
let user = {
    email: 'testasdf@email.com',
    password: 'test',
    firstName: 'Test',
    lastName: 'TestLastName',
    bio: 'Test Bio'
};
let devUrl = 'http://localhost:4000';
describe('User Tests', () => {
    let userId = 0;
    it('should create user record in the db', () => __awaiter(this, void 0, void 0, function* () {
        let result = yield axios.post(`${devUrl}/register`, user);
        expect(result);
    }));
    it('should log in the user', () => __awaiter(this, void 0, void 0, function* () {
        let result = yield axios.post(`${devUrl}/login`, { email: user.email, password: user.password });
        expect(result);
    }));
    it('should delete test user from database', () => __awaiter(this, void 0, void 0, function* () {
        let result = axios.post(`${devUrl}/deleteApplicationUser`, { id: 2 }, {
            headers: {
                authorization: 'bearer 1234'
            }
        });
        expect(result);
    }));
});
//# sourceMappingURL=applicationUserTests.js.map