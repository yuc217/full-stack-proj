# part4 exercise 4.1 - 4.23

blog post backend with tests and helper functions

refactoring using controller/model/utils/test rather than a huge index.js

User login, Authorization token Bearer

http://localhost:3003/api/users  show users with blogs created under the user
http://localhost:3003/api/blogs  show blogs with user info

npm test -- --test-only
npm run dev


TEST blog_api: 

Test GET functionality
  ✔ blogs are returned as JSON (785.778128ms)
  ✔ returns the correct amount of blog posts (297.033658ms)
  ✔ unique id property of the blogs is named id (302.433198ms)
▶ Test GET functionality (1388.087887ms)

▶ Test POST functionality
  ✔ add a valid blog (392.455024ms)
  ✔ if the likes property is missing, defaults to 0 (342.610348ms)
  ✔ if the title or url are missing, the backend sends 400 (286.139171ms)
  ✔ should return 401 Unauthorized if token is not provided (275.949014ms)
▶ Test POST functionality (1298.25246ms)

▶ Test DELETE functionality
  ✔ successfully deletes a blog with a valid ID (448.286226ms)
  ✔ responds with 404 if blog does not exist (311.478055ms)
  ✔ responds with 400 if ID is invalid (300.361847ms)
▶ Test DELETE functionality (1061.297281ms)

▶ Test PUT (update) functionality
  ✔ successfully updates a blog with a valid ID (337.691418ms)
  ✔ responds with 404 if id does not exist already (283.441904ms)
  ✔ responds with 500 if ID is invalid (266.320642ms)
  ℹ 'only' and 'runOnly' require the --test-only command-line option.
▶ Test PUT (update) functionality (888.198062ms)

TEST list_helper:

✔ dummy returns one (1.235001ms)
▶ totalLikes
  ✔ of empty list is zero (0.260588ms)
  ✔ when list has only one blog, equals the likes of that (0.226909ms)
  ✔ of a bigger list is calculated right (0.15726ms)
▶ totalLikes (1.182156ms)

▶ favoriteBlog
  ✔ of empty list is zero (0.568686ms)
  ✔ when list has only one blog, makes it the favorite blog (0.430287ms)
  ✔ a list of blogs find the favorite blog with the most likes (0.199023ms)
▶ favoriteBlog (1.702197ms)

▶ mostBlogs
  ✔ of empty list is zero (0.278907ms)
  ✔ when list has only one blog, returns the author (0.726894ms)
  ✔ a list of blogs find the author with the most blogs (0.27389ms)
▶ mostBlogs (1.832428ms)

▶ mostLikes
  ✔ of empty list is zero (0.304428ms)
  ✔ when list has only one blog, returns the author (0.408318ms)
  ✔ a list of blogs find the author with the most likes (0.308534ms)
▶ mostLikes (1.603039ms)

TEST user_api:

▶ Test POST - adding new user
  ✔ users are returned as json (431.476327ms)
  ✔ a valid user can be added (218.832898ms)
  ✔ invalid user - username too short (59.631936ms)
  ✔ invalid user - password too short (62.968644ms)
  ✔ invalid user - missing username or password (62.120464ms)
▶ Test POST - adding new user