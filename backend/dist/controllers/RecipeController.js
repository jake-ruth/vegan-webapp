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
exports.RecipeController = void 0;
const ApplicationUser_1 = require("../entities/ApplicationUser");
const typeorm_1 = require("typeorm");
const Recipe_1 = require("../entities/Recipe");
class RecipeController {
}
exports.RecipeController = RecipeController;
RecipeController.pageRecipes = (page, orderByField) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe_1.Recipe.find({ order: { createdDate: 'DESC' }, skip: page * 8, take: 8 });
    const totalCount = yield Recipe_1.Recipe.count();
    return { recipes, totalCount };
});
RecipeController.pageRecipesByName = (page, searchString) => __awaiter(void 0, void 0, void 0, function* () {
    let formatted = searchString.replace(/'/g, "''");
    const recipes = yield Recipe_1.Recipe.find({
        order: { createdDate: 'DESC' },
        skip: page * 8,
        take: 8,
        where: `"title" ILIKE '%${formatted}%'`
    });
    const totalCount = yield Recipe_1.Recipe.count({ where: `"title" ILIKE '%${formatted}%'` });
    return { recipes, totalCount };
});
RecipeController.getRecipesForUser = (userUuid) => __awaiter(void 0, void 0, void 0, function* () {
    //Todo: look into why I have to do this instead of just using uuid directly
    const user = yield ApplicationUser_1.ApplicationUser.findOne({ where: { uuid: userUuid } });
    return yield Recipe_1.Recipe.find({ where: { applicationUser: { id: user === null || user === void 0 ? void 0 : user.id } } });
});
RecipeController.createRecipe = (recipe, userUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const fullUser = yield ApplicationUser_1.ApplicationUser.findOne({ where: { uuid: userUuid } });
    recipe.applicationUser = fullUser;
    return yield Recipe_1.Recipe.save(recipe);
});
RecipeController.searchRecipesByName = (searchString) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Recipe_1.Recipe.find({ where: { title: typeorm_1.Like(`%${searchString}%`) } });
});
//# sourceMappingURL=RecipeController.js.map