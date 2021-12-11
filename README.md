# API Automation

Repo for all the consume ui test automation.
- [API Automation](#api-automation)
  - [Pre Reqs](#pre-reqs)
    - [Install Cypress](#install-cypress)
  - [Running cypress Tests](#running-cypress-tests)
  - [Useful Links](#useful-links)
  - [Files And Folders Structure](#files-and-folders-structure)
  

## Pre Reqs

### Install Cypress
`npm install cypress --save-dev`
`npm install elasticsearch --save-dev`
`npm install await-spawn`
`npm install mochawesome`
`npm install mochawesome-merge`
`npm install mochawesome-report-generator`
`npm install cypress-terminal-report`
`npm install request-promise`


## Running cypress Tests
1. Before starting the test exection, enter the credentials like apiKey, userID in environments.json file (located in root directory ) 
2. Open terminal and run `npx cypress run --spec cypress/integration/apitest/*.js` to execute all the files under specified folder
3. Open terminal and run `npx cypress run --spec cypress/integration/apitest/filename.js` to execute specified file
4. During developement if you wish to run a particular test , makr that test as 'it.only'


## Useful Links
1. Cypress documentaion link can be found <a href = "https://docs.cypress.io/">here</a>
2. For assertions , cypress uses Chai library. Details <a href = "https://www.chaijs.com/guide/">here</a>
3. For reporting refer <a href = "https://docs.cypress.io/guides/tooling/reporters#Custom-reporter">here</a>


## Files And Folders Structure
1) fixtures - Contains Test data to be used in suites/tests.
2) integration - All the test files are added under this folder
3) plugins - If we are integrating any external plugins ,it has to be included in 'index.js' under this folder
4) reports - Custom folder for generated reports
5) screenshots - Screenshots for the failed tests are captured here
6) support - Helper methods to support test execution
7) videos - Videos of the passed tests are captured here
8) logs - Logs are created here
9) package.json - Provides Metadata info and project dependencies.
10)elasticSearchTool - elastic connection and elk queries are defined in this folder with respect to specific card's.

##For Merge Report
1)npm i junit-report-merger
