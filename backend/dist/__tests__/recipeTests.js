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
const Recipe_1 = require("../entities/Recipe");
const typeorm_1 = require("typeorm");
const RecipeController_1 = require("../controllers/RecipeController");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getConnection().close();
}));
let recipe = new Recipe_1.Recipe();
recipe.title = 'Heyo Recipe';
recipe.description = 'Test Description';
recipe.instructions = 'Instructions';
recipe.prepMinutes = '10';
recipe.cookMinutes = '10';
recipe.createdDate = new Date();
let recipeId = 0;
describe('Recipe Tests', () => {
    it('should create recipe in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield RecipeController_1.RecipeController.createRecipe(recipe, 'testUuid');
            recipeId = result.id;
            expect(result.title).toBe(recipe.title);
        }
        catch (err) {
            console.log('ERR: ', err);
        }
    }));
    it('should delete recipe from db', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Recipe_1.Recipe.delete(recipeId);
            expect(result);
        }
        catch (err) {
            console.log('ERR: ', err);
        }
    }));
});
//# sourceMappingURL=recipeTests.js.map