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
const RecipeController_1 = require("../controllers/RecipeController");
const body_parser_1 = __importDefault(require("body-parser"));
const Recipe_1 = require("../entities/Recipe");
const authentication_1 = require("../middleware/authentication");
const express = require('express');
const router = express.Router();
router.use(body_parser_1.default.json());
router.get('/pageRecipes/:pageNumber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageNumber = Number(req.params.pageNumber);
    try {
        const recipes = yield RecipeController_1.RecipeController.pageRecipes(pageNumber, 'createdDate');
        console.log('REC: ', recipes);
        return res.json(recipes).status(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}));
router.get('/getRecipeById/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let recipe = yield Recipe_1.Recipe.findOne(req.params.id);
    return res.json(recipe).status(200);
}));
router.get('/getRecipesForUser/:userUuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield RecipeController_1.RecipeController.getRecipesForUser(req.params.userUuid);
    return res.json(recipes).status(200);
}));
router.get('/searchRecipesByName/:searchString', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let recipes = yield RecipeController_1.RecipeController.searchRecipesByName(req.params.searchString);
    return res.json(recipes).status(200);
}));
router.get('/pageRecipesByName/:pageNumber/:searchString', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageNumber = Number(req.params.pageNumber);
    let searchString = req.params.searchString;
    try {
        const recipes = yield RecipeController_1.RecipeController.pageRecipesByName(pageNumber, searchString);
        return res.json(recipes).status(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}));
router.post('/createRecipe', authentication_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let recipe = new Recipe_1.Recipe();
    const { title, imageExtension, description, instructions, ingredients, prepMinutes, cookMinutes, yieldAmount } = req.body.recipe;
    const userUuid = req.body.userUuid;
    recipe.title = title;
    recipe.description = description;
    recipe.instructions = instructions;
    recipe.ingredients = ingredients;
    recipe.prepMinutes = prepMinutes;
    recipe.cookMinutes = cookMinutes;
    recipe.yieldAmount = yieldAmount;
    recipe.imageExtension = imageExtension;
    try {
        yield RecipeController_1.RecipeController.createRecipe(recipe, userUuid);
        return res.json(recipe).status(201);
    }
    catch (err) {
        return console.log(err);
    }
}));
module.exports = router;
//# sourceMappingURL=recipeRoutes.js.map