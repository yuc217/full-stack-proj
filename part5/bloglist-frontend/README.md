# part5 exercise 5.1 - 5.23

npm install
npm run dev

proxy setting in vite config file

add login component, saving token to local storage, logout and clearing storage

create tests, and playwright tests

 ✓ tests/Blog.test.jsx (3) 421ms
 ✓ tests/BlogForm.test.jsx (1) 821ms

 Test Files  2 passed (2)
      Tests  4 passed (4)

npm test            

> playwright@1.0.0 test
> playwright test

Running 8 tests using 1 worker

  ✓  1 …ogin.test.js:8:3 › Blog app › 5.17: Login form is displayed correctly with header, textbox and submit button (615ms)
  ✓  2 tests/login.test.js:38:5 › Blog app › Login › 5.18: succeeds with correct credentials (1.0s)
  ✓  3 tests/login.test.js:46:5 › Blog app › Login › 5.18: fails with wrong credentials (748ms)
  ✓  4 tests/login.test.js:80:3 › When logged in › 5.19: a new blog can be created (1.0s)
  ✓  5 tests/login.test.js:87:3 › When logged in › 5.20: the blog can be liked (1.2s)
  ✓  6 tests/login.test.js:97:3 › When logged in › 5.21: user who added the blog can delete the blog (1.2s)
  ✓  7 tests/login.test.js:112:3 › When logged in › 5.22: only the user who added the blog sees the delete button (1.3s)
  ✓  8 tests/login.test.js:131:3 › When logged in › 5.23: blogs are arranged in the order according to the likes (1.8s)

  8 passed (10.0s)