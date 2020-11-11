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
let recipe = {
    title: "Jake's Magic Cookies",
    description: 'this recipe is to die for, the master himself shall teach you to cook it',
    instructions: 'Step 1: Saute vegetables Step 2: Mix in Sauce',
    prepMinutes: 10,
    cookMinutes: 10,
    ingredients: ['broccoli', 'onion', 'young potato']
};
describe('Recipe Tests', () => {
    it('should create a recipe', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield axios.post(`${devUrl}/createRecipe`, recipe);
            console.log('RES: ', result);
            expect(result);
        }
        catch (err) {
            console.log('ERR: ', err);
        }
    }));
});
//# sourceMappingURL=recipeTests.js.map