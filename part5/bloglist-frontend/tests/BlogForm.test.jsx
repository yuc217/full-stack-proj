import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('5.16: render right details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()
    render(<BlogForm createBlog={mockCreateBlog} />)
    const user = userEvent.setup()
    
    const titleInput = screen.getByPlaceholderText('Enter title')
    const authorInput = screen.getByPlaceholderText('Enter author')
    const urlInput = screen.getByPlaceholderText('Enter url')
    const createButton = screen.getByText('create')
  
    await user.type(titleInput, 'This is a Title')
    await user.type(authorInput, 'This is an Author')
    await user.type(urlInput, 'http://testXXXX9999944.com')
    await user.click(createButton)

    // hanlder should be called once
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
  
    // Check the content
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: 'This is a Title',
      author: 'This is an Author',
      url: 'http://testXXXX9999944.com'
    })
  })