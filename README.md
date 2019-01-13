This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs all the testSuites

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Overall Solution

The UI contains:
- A search input with search button where you can place the searchQuery
- A radioButton to select the number of columns per row
- All results are listed underneath the above ui elements
- When you reached the end of the page more results will be loaded

Tools Used
-React 16, material ui for the ui elements, redux store with redux-thunk middleware for state management,
sass for styling

Architecture Decisions

- How did you implement the feature of infinite scrolling?

To accomplish this behaviour I had created a React Component that contains the UI that holds all the results.
I have implemented a method to trigger when the window Scroll height has reached the bottom of the page and immediately dispatch
an action to retrieve results from the API based on the searchTerm given on the input above
If the redux state returns the Request message, this means that request has not been resolved yet so I use the CircularProgress material-ui element.
When results are returned then the new list is rendered. Due to the keys assigned to each element of the list, react is able to render only whatever is new on the list.

- How did you implement the feature of showing results in groups of n per row?
The UI design helped me to achieve this goal. I used JSX render Methods to create out of the results
a list of rows where based on the UI selection I split data in (n-rows of [1,3,5] columns )
I do this by using utils.js -> splitInChunks

- Error Handling
Whenever an api response is unsucessful then redux dispatches error Action which renders an error message at QueryUI
which renders an error message

- Redux
I am using a root reducer which contains request,search actions behavior which is responsible to deliver in the mapStateToProps will either retrieve the loading message or the data
Used redux-thunk in order to work better with redux and rest-apis

Testing
bash command: npm test , when in the main directory of the project runs all the tests
I used jasmine with enzyme for UI testing
I wrote tests for the reducers, actions and of course the utils the most important method in the application.
I put the tests files next to the js and sass files
For the UI I tested if a ResultContainer can render rows
I test in ResultRow if the ui is creating a list of ImageContainers


Code organization

Source code contains:
- Actions. Redux Actions to retrieve data from the API and update the Ui accordingly
- Reducers. Redux Reduces to process state changes
- Store. Redux store
- Utils. Contains method to split array in batches
- Components:
    The main idea is that UI is created by rendering QueryUI which renders the search of the UI
    and a ResultsContainer with the results. Every container is responsible for the actions to request data when scrolling reached bottom
    and renders the results by rendering a list of ResultsRow. Every ResultsRow renders a Grid that contains 1,3,5 image container ( selected number of columns )
-App.js
Renders the app. Sets up the Redux Store and places the QueryUI

-QueryUI.js
Contains Search UI, Displays search Results

-ResultsContainerReduxWrapper.js
This file contains the mapping from store to state (redux) of ResultsContainer

-ResultsContainer.js
Contains the results
    - scrollOnContainer: detects when scrolling reached page bottom
    - requests data from API ( Giphy ). Dispatches redux action

-ResultsRow.js
Renders one row of results. Can have n columns

-ImageContainer.js
Renders the part that holds the image on a column and a row

