# Voice-UI-Kata

# Customer Voice Hotel UI + API Server

## Requirements

* Git
* Nodejs v10+ & NPM v5.51+ (`brew install node` on a MAC)

## Running Locally

### Backend API (incl. basic JSON DB)

- Open a terminal and navigate to this folder. Then:

    ```bash
    cd backend-api
    npm install
    npm run server
    ```

### UI

- Open a terminal and navigate to this folder. Then:

    ```bash
    cd client-ui
    npm install
    npm run start
    ```

#### Running End-to-end tests:

- Note: This requires the backend api server to be running. To do so, see above

```bash
npm run test-e2e
```

What the underlying cucumber-js test engine does is:

 - Look for files with the .feature file extension in the features folder
 - Look for files that contain step definition functions
 - Look for a hooks.js file in the features folder
 - Look for a world.js file in the features folder
 - Look for any step definition functions that are in the step_definitions folder
 - Parse the feature files for Cucumber scenarios
 - Parse the steps in each of those Cucumber scenarios
 - Find any step definition functions that match with those steps
 - For any steps that don’t have matching step definition functions, output sample code to the command line
