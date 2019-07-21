# Course Rating API with Express Build

-To launch API application run:
  $ npm install
  $ npm nodemon

-To test with mocha/chai run:
  $ npm test

-seed-data file included to populate MongoDB database.
-navigate to seed-data folder and run commands to seed:
  $ mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
  $ mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
  $ mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json

-'CourseAPI.postman_collection.json' file included to be used with Postman ADE
-Test all routes with authorization/data validation checks
