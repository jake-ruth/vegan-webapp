// import { ApplicationUser } from "../entities/ApplicationUser";

let recipe = {
  title: "Jake's Magic Cookies",
  description: 'this recipe is to die for, the master himself shall teach you to cook it',
  instructions: 'Step 1: Saute vegetables Step 2: Mix in Sauce',
  prepMinutes: 10,
  cookMinutes: 10,
  ingredients: ['broccoli', 'onion', 'young potato']
};

describe('Recipe Tests', () => {
  const axios = require('axios');
  let devUrl = 'http://localhost:4000';

  it('should create a recipe', async () => {
    try {
      let result = await axios.post(`${devUrl}/createRecipe`, recipe);

      console.log('RES: ', result);
      expect(result);
    } catch (err) {
      fail(err);
    }
  });

  it('should read a recipe by id', async () => {
    try {
      let result = await axios.get(`${devUrl}/getRecipeById/104`);
      console.log('RES: ', result);
      expect(result);
    } catch (err) {
      fail(err);
    }
  });
});
