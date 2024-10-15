const { test, expect, beforeAll, afterAll, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  let userId

  beforeAll(async ({ request }) => {
    // Create a new user 
    const response = await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'tmp',
        password: 'tmp0009922',
        name: 'tmp user'
      }
    })
    userId = await response.json().id
  })

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

    const usernameInput = page.locator('input[placeholder="Enter username"]')
    const passwordInput = page.locator('input[placeholder="Enter password"]')
    const loginButton = page.locator('button[type="submit"]')
    // check form input box and submit button
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
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

  afterAll(async ({ request }) => {
    await request.delete(`http://localhost:3003/api/users/${userId}`)
  })
})