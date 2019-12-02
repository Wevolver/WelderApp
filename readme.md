# Wevolver

> Wevolver's front end built in React

# Dependencies

1. Install [Node](https://nodejs.org/en/download/package-manager/)

# Setup

1. [Clone](https://help.github.com/articles/cloning-a-repository/) this repo to your local device.
2. `cd` into the project root.
3. Install yarn: `npm install -g yarn`
4. Install the dependencies: `yarn`
5. Run `yarn start` to build, run and watch for code changes.

# Configuration

1. Change the **development** values in `./src/constants/api.js` to match your local setup for [Api-V2](https://bitbucket.org/wevolver/api-v2/src/master/), [Wevolve](https://bitbucket.org/wevolver/wevolve/src/master/) (Api-V1) and [Welder](https://github.com/Wevolver/Welder).

2. Google analytics can be used by filling in the initializer located in `index.js`
3. To use Heap analytics do a project wide search for `heap.load()` and fill in your key where necessary.
4. A google maps key must be added to its tag in `public/index.html`
5. Configuration for auth is found in `/modules/auth.js`. You must first have a properly configured app in Auth0. Start there if you haven't already.

# Deployment instructions

1. Build Wevolver for staging `yarn build:staging` or production `yarn build`.
2. Upload the `./build` folder into the corresponding S3 bucket: staging.wevolver.com for staging or www.wevolver.com for production.
3. Alternatively, install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html), input your AWS credentials and sync the build folder to the bucket: `aws s3 sync ./build s3://<bucket name>`

# Development

All of the files are in the `./src` folder. To modify how something looks, you most likely have to edit a file in the `./components` folder.

1. `./src/actions`: actions that trigger reducer functions and sagas.
2. `./src/components`: presentational components. Exclusively receives data via props. Essentially concerned with how things look.
3. `./src/constants`: constants for action names and API endpoints.
4. `./src/containers`: wrappers for the components that fetch data from the Redux store.
5. `./src/loaders`: helper function to load different file formats in the three.js viewer.
6. `./src/modules`: helper functions for authentication, network calls, heap, toast notifications and util functions.
7. `./src/reducers`: specify how the application's state changes in response to actions sent to the store.
8. `./src/sagas`: sagas fetch data from the APIs and create actions with the received data.
9. `./src/store`: holds the application state and allows access to it using connect().

# Icons

We use Linear Icons for this project. More info can be found here: https://linearicons.com
