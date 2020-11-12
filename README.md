This is a full stack Vegan Recipe webapp

## Current deployment workflow to Heroku

Open up bash terminal window, navigate to root project directory

Before building, set the react app environment variable to the production link:
`REACT_APP_BACKEND_URL=https://vegan-webapp.herokuapp.com`

Run `npm run build` in both frontend and backend folders

Commit changes to git

Run `git push heroku master`

This should build the frontend and backend and return an enpoint for the app

Check to make sure changes have been transferred

### Make sure you set the environment variables in the heroku cli!

Example:

`heroku config:set TYPEORM_DB_PASSWORD=1234`
