const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('5.17: Login form is displayed correctly with header, textbox and submit button', async ({ page }) => {
    // check header
    const loginHeader = page.locator('text=Log in to application')
    await expect(loginHeader).toBeVisible()

    // check form
    const loginForm = page.locator('form')
    await expect(loginForm).toBeVisible()

    // check form input box and submit button
    await expect(page.locator('input[placeholder="Enter username"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      // empty TEST db
      await request.post('http://localhost:3003/api/testing/reset')
      // Create a new user 
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'tmp',
          password: 'tmp0009922',
          name: 'tmp user'
        }
      })
      await page.goto('http://localhost:5173')
    })

    test('5.18: succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[placeholder="Enter username"]', 'tmp')
      await page.fill('input[placeholder="Enter password"]', 'tmp0009922')
      await page.click('button[type="submit"]')
      // Check login successful or not
      await expect(page.locator('text=tmp user logged in')).toBeVisible()
    })

    test('5.18: fails with wrong credentials', async ({ page }) => {
      await page.fill('input[placeholder="Enter username"]', 'wrong')
      await page.fill('input[placeholder="Enter password"]', 'wrong')
      await page.click('button[type="submit"]')
      // Check if the login failed 
      await expect(page.locator('text=wrong username or password')).toBeVisible()
    })
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'tmp',
        password: 'tmp0009922',
        name: 'tmp user'
      }
    })
    await page.goto('http://localhost:5173')
    // log in
    await page.fill('input[placeholder="Enter username"]', 'tmp')
    await page.fill('input[placeholder="Enter password"]', 'tmp0009922')
    await page.click('button[type="submit"]')
    // create new blog
    // await page.click('button:has-text("create new blog")')
    // await page.fill('input[placeholder="Enter title"]', 'Test adding title')
    // await page.fill('input[placeholder="Enter author"]', 'Test adding writer')
    // await page.fill('input[placeholder="Enter url"]', 'http://test11234488.com')
    // await page.click('button[type="submit"]')
    await createBlog(page, 'Test adding title', 'Test adding writer', 'http://test11234488.com')
  })

  test('5.19: a new blog can be created', async ({ page }) => {
    // check if the blog is created
    await expect(page.locator('div.success')).toBeVisible()
    await expect(page.getByText('A new blog "Test adding title" by Test adding writer added!')).toBeVisible()
    await expect(page.getByText('Test adding title Test adding writer')).toBeVisible()
  })

  test('5.20: the blog can be liked', async ({ page }) => {
    await page.click('button[name="hideView"]')
    // check and click the 'like' button
    await expect(page.locator('button[name="like"]')).toBeVisible()
    await page.click('button[name="like"]')

    // check likes
    await expect(page.locator('text=Likes: 1')).toBeVisible()
  })

  test('5.21: user who added the blog can delete the blog', async ({ page }) => {
    await page.click('button[name="hideView"]')

    // window confirm, need to put before the button click action
    page.on('dialog', async dialog => {
      await dialog.accept()
    })
    // check and click on the delete button
    await expect(page.locator('button[name="delete"]')).toBeVisible()
    await page.click('button[name="delete"]')

    // check deleted blog
    await expect(page.locator('text=Test adding title Test adding writer')).not.toBeVisible()
  })

  test('5.22: only the user who added the blog sees the delete button', async ({ page, request }) => {
    // create another user
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'tmp2',
        name: 'tmp2',
        password: 'tmp21222111'
      },
    })
    await page.click('button:has-text("logout")')
    // log in
    await page.fill('input[placeholder="Enter username"]', 'tmp2')
    await page.fill('input[placeholder="Enter password"]', 'tmp21222111')
    await page.click('button[type="submit"]')
    await page.click('button[name="hideView"]')
    // check if delete button visible
    await expect(page.locator('button[name="delete"]')).not.toBeVisible()
  })

  test('5.23: blogs are arranged in the order according to the likes', async ({ page }) => {
    // add more blogs
    await createBlog(page, 'More Blog', 'Amy', 'http://amy.com')
    await createBlog(page, 'Still More Blog', 'Anne', 'http://anne.com')
    const blogs = await page.getByTestId('blog').all()

    // like the first blog
    await blogs[0].getByTestId('view').click()
    await blogs[0].getByTestId('like').click()
    await blogs[0].locator('text=Likes: 1').waitFor()
    await blogs[0].getByTestId('like').click()
    await blogs[0].locator('text=Likes: 2').waitFor()
    // like another blog
    await blogs[1].getByTestId('view').click()
    await blogs[1].getByTestId('like').click()
    await blogs[1].locator('text=Likes: 1').waitFor()

    const likedBlogs = await page.getByTestId('blog').all()
    await likedBlogs[2].getByTestId('view').click()
    // console.log(likedBlogs)
    // check if the likes in descending order
    await expect(likedBlogs[0].getByTestId('blog-likes')).toHaveText('Likes: 2')
    await expect(likedBlogs[1].getByTestId('blog-likes')).toHaveText('Likes: 1')
    await expect(likedBlogs[2].getByTestId('blog-likes')).toHaveText('Likes: 0')
  })

  const createBlog = async (page, title, author, url) => {
    await page.click('button:has-text("create new blog")')
    await page.fill('input[placeholder="Enter title"]', title)
    await page.fill('input[placeholder="Enter author"]', author)
    await page.fill('input[placeholder="Enter url"]', url)
    await page.click('button[type="submit"]')
    await page.locator('div.success').waitFor()
  }
})