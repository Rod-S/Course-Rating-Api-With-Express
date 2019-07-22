# Course Rating API with Express Build

-To launch API application run:
  $~ npm install
  $~ npm nodemon

-Initial Setup MongoDB db data:
  -seed-data file included to populate MongoDB database.
  -create a mongoDB database named 'course-api'.
  -navigate to seed-data folder and run commands to seed:
    $~ mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
    $~ mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
    $~ mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json

-'CourseAPI.postman_collection.json' file included to be used with Postman ADE
-Test all routes with authorization/data validation checks

-To test with mocha/chai run:
  $~ npm test
