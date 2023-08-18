# Prerequiste:

-   Install and run a mongodb server instance locally.
-   Install yarn
-   Install dependencies by running `yarn` in root
-   Install postman or any other tool that can handle postman collections

# To Start application:

-   Run any of the `yarn start` commands from the package.json according to your preference of behaviour. (To run `yarn start:prod` you need to run `yarn build` separately)

# How the app Functions:

-   A user is identified by the `partyUid` in a provided Bearer token. (Only decode as it was to much work to set up / manage testdata for authorizing setup)
-   If access is to be limited by agent scope the id is looked up to verify scope before takin action.
-   All agent access points have a scope requirement (currently disabled on create agent as a simple means to get started on fresh setup)

# How to run:

-   Import the provided postman collection into postman and run the queries
-   TODO: Future, run sister frontend app to query the code
