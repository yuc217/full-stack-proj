const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//         genres: ['agile', 'patterns', 'design']
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'patterns']
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'design']
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'crime']
//     },
//     {
//         title: 'Demons',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'revolution']
//     },
// ]

const typeDefs = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int
        ): Author

        createUser(
            username: String!
        ): User
    
        login(
            username: String!
            password: String!
        ): Token  
        
        addAsFriend(
            name: String!
        ): User
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            // let neededBooks = Book.find({}).populate('author')
            let filter = {}
            if (args.author) {
                // neededBooks = neededBooks.filter(b => b.author === args.author)
                const author = await Author.findOne({ name: args.author })
                filter = { author: author._id }
            }
            if (args.genre) {
                // neededBooks = neededBooks.filter(b => b.genres.includes(args.genre))
                filter = { ...filter, genres: args.genre }
            }
            return await Book.find(filter).populate('author')
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
          }
    },
    Author: {
        bookCount: async (root) => {
            // return books.filter(b => b.author === root.name).length
            const books = await Book.find({ author: root._id })
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                  }
                })
              }
            // const author = authors.find(a => a.name === args.author)
            // if (!author) {
            //     authors = authors.concat({ name: args.author, id: uuid() }) 
            // }
            try {
                let author = await Author.findOne({ name: args.author })
                if (!author) {
                    author = new Author({ name: args.author })
                    await author.save()
                }
                const book = new Book({ ...args, author: author._id })
                await book.save()
                return book.populate('author')
                // currentUser.friends = currentUser.friends.concat(person)
                // await currentUser.save()
            } catch (error) {
                throw new GraphQLError('Saving failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            // const book = { ...args, id: uuid() }
            // books = books.concat(book)
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                  }
                })
              }
            // const author = authors.find(a => a.name === args.name)
            // const editedAuthor = { ...author, born: args.setBornTo }
            // authors = authors.map(a => a.name === args.name ? editedAuthor : a)
            try {
                const author = await Author.findOne({ name: args.name })
                if (!author) {
                    throw new GraphQLError(`Author with name '${args.name}' not found`)
                }
                author.born = args.setBornTo
                await author.save()
                return author
            } catch (error) {
                throw new GraphQLError('Editing failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username })
        
            return user.save()
              .catch(error => {
                throw new GraphQLError('Creating the user failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error
                  }
                })
              })
          },
          login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secret' ) {
              throw new GraphQLError('wrong credentials', {
                extensions: { code: 'BAD_USER_INPUT' }
              })        
            }
        
            const userForToken = {
              username: user.username,
              id: user._id,
            }
        
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
          },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })