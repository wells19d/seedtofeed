# Seed to Feed

## Description

_Duration: 3 Week Sprint_

Seed to Feed was created to help increase profitability for farmers and feed producers, as well as the partners in-between. This project will benefit the entire supply chain, all the way back to your local farmer. Our mission is to promote industry education, explore existing supply chain challenges, and highlight technology and industry partners working on solutions.


## Application Overview

The Seed to Feed App is a tracker and dashboard that will show the process of seed to feed while including information about quality of the commodity. This will be done by allowing producers to enter information about the planting and growing process up until elevator delivery.  After the grain is delivered we will be aggregating information from already existing players (Grand Farm, Bushel, AgriDigital, Geora) and displaying that information as a way to further market grain by showing the added value received from purchasing Seed to Feed product.

<!--This will be for screen shots once we have views created-->
## Wireframes

Farmer's Home View
---
![image](https://user-images.githubusercontent.com/73319716/126553018-9870fae5-8a0a-4e68-8719-901511023d9c.png)


Farmer's Detailed View of a Field
---
![image](https://user-images.githubusercontent.com/73319716/126553152-0eea1660-3d6b-4df4-b866-0fc76b5ca1d3.png)

Buyer's Home view
---
![image](https://user-images.githubusercontent.com/73319716/126553207-a0d27906-7531-402e-8be5-3377399415b7.png)

NIR Table
---
![image](https://user-images.githubusercontent.com/73319716/126553267-50593b16-18d4-4a1e-87c1-2a27862f9319.png)

Create a Contract
---
![image](https://user-images.githubusercontent.com/73319716/126553313-64b7e213-dd19-423b-a059-77117b622992.png)

View a Contract
---

![image](https://user-images.githubusercontent.com/73319716/126553379-3e1cef45-a994-42ef-9298-9b186ff8f4bb.png)


## Summary of Features
- Farmer can log in and add a field that they will be able to track
- View dashboard of information (field status, contract status, metadata, any additional sensor data) about the field
- Can record and view transaction history for the field
- Can record and view Near infrared (NIR) information for quality analysis
- Can update and view contract status
- Stretch goals include third party API integration and pushing to blockchain platforms.



# Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)

1. Create a database named `seed_to_feed`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
<br/>
(The `npm run client` command will open up a new browser tab for you!)


## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Usage

1. A user can register as a farmer or buyer
2. A farmer can add new fields and view them
3. A buyer can be added to a field to have access the view
4. A farmer can create a contract to send to a buyer
5. There is a Dashboard for the user to watch the progress of a field

## Next Steps
- In order to make the tracker more streamlined, all steps in the workflow update automatically from the partners that gather the data straight to the user          without the user having to manually update forms.
- More data tables on the dashboard that show the state of the field and commodity as well as weather and other useful information.
- Create the ability for a potential buyer to actually make an offer through the app.


# Deployment
- npm run server
- npm run client

# Technologies

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material](https://material-ui.com/)


- (a full list of dependencies can be found in `package.json`).



# Miscellaneous Technologies Used
- [Moment](https://momentjs.com/)
- [Cloudinary](https://cloudinary.com/)
- [FontAwesome](https://fontawesome.com/)
- [Trello](https://trello.com)
- [Heroku](https://www.heroku.com)

----------------------------------------------------------------------------------------------------------------------------
