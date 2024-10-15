import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

const blog = {
  title: 'Test title',
  author: 'Tester',
  url: 'http://test112233445.com',
  likes: 2330,
  user: {
    name: 'Test user 001',
    username: 'user001'
  }
}

test('5.13: render content title and author, not url and likes', () => {
  render(<Blog blog={blog} />)
  // display title and author
  const titleAuthorElement = screen.getByText('Test title Tester')
  expect(titleAuthorElement).toBeInTheDocument()
  // url not being displayed
  const urlElement = screen.queryByText('URL: http:\/\/test112233445\.com')
  expect(urlElement).not.toBeInTheDocument()
  // lieks not being displayed
  const likesElement = screen.queryByText('Likes: 2330')
  expect(likesElement).not.toBeInTheDocument()
})

test('5.14: render URL and likes when details button is clicked', async () => {
  render(<Blog blog={blog} />)
  // click button
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  // check url 
  const urlElement = screen.getByText('URL: http:\/\/test112233445\.com')
  expect(urlElement).toBeInTheDocument()
  // check likes
  const likesElement = screen.getByText('Likes: 2330')
  expect(likesElement).toBeInTheDocument()
})

test('5.15: like button is clicked twice', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} updateBlog={mockHandler}  />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  // click twice on the like button
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  // check handler
  expect(mockHandler.mock.calls).toHaveLength(2)
})