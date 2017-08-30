This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Development Configuration
Clone the repository and do things below:
* run `npm install` or `yarn install` to install dependencies.
* run `npm start` or `yarn start` to start a development server on port 3000.

## Deployment on Heroku
Here's what I do to deploy this project on Heroku:<br>
I'm following this guide [https://blog.heroku.com/deploying-react-with-zero-configuration](https://blog.heroku.com/deploying-react-with-zero-configuration).
```
$ npm install -g create-react-app
$ create-react-app my-app
$ cd my-app
$ git init
$ heroku create -b https://github.com/mars/create-react-app-buildpack.git
$ git add .
$ git commit -m "react-create-app on Heroku"
$ git push heroku master
$ heroku open
```
After doing all that, I copied all the source files and start installing all the dependencies.
When all files and dependencies are complete, do push to heroku with `git push heroku master`.

If build process failed and there's a message about Yarn, then do this:
```
$ yarn install
$ git add yarn.lock
$ git commit -m "Updated Yarn lockfile"
$ git push heroku master
```
Reference: [https://kb.heroku.com/why-is-my-node-js-build-failing-because-of-an-outdated-yarn-lockfile](https://kb.heroku.com/why-is-my-node-js-build-failing-because-of-an-outdated-yarn-lockfile)

## Development Process and Difficulties Encountered
First, I read all the instruction and take a look on the mockup image and the API endpoints. I started to identify elements on the mockup image and divide them into 2 categories, component and container. Elements interfering with the state will be considered as a container.

After that, I'm creating actions and reducers related to the external data (search suggestions and search results). To do this, I'm using axios library to do API calls and a middleware called redux-promise to process promises from axios requests.

Being done with actions and reducers, I started to code the components and containers. I was encountering some difficulties with the pagination component, the component won't re-render even if the action has been called and changed the state. It turns out that it was a silly mistake, I forgot to prefix the action with `this.props.` when calling it. It obviously won't update the state then.

Dealing with the pagination is the trickiest part here, because the API returns 50 data in a single API call but maximum data allowed to be shown in the application is 10. So I made an adapter in the action (before doing API call) and in the headline container (after API gives response) to convert 50 data pager between 10 data pager.

For UI, I'm using [Ant Design](https://ant.design) components and applied some inline CSS for styling.

## My Experience About This Interview
The process is great, this is a good assignment for skill testing. Maybe there are some things about the OpenAPI that need to be considered, such as it can't be accessed via https protocol. In Heroku implementation, Heroku App will automatically block any non-https requests. So the app demo will not be run smoothly in Heroku App.

I also notice that the search suggestions only make sense if the years at the end of every data is omitted or cut, because results won't come up if the years still exist there. When we delete the years, the results will immediately come up, therefore showing results as expected by the user when they select or choose an autocomplete suggestions.  This is just my opinion on the user experience.

Thank you for this interview.
