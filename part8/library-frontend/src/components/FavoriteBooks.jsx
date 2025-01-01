import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'

const FavoriteBooks = ({ show, token }) => {
    const [selectedGenre, setSelectedGenre] = useState("all");
    const { loading: allBooksLoading, data: allBooksData } = useQuery(ALL_BOOKS);
    const { loading: genreBooksLoading, data: genreBooksData } = useQuery(BOOKS_BY_GENRE, {
        variables: { genre: selectedGenre },
        skip: selectedGenre === "all",
    });

    const { data: userData, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(ME, {
        skip: !token,
    });

    useEffect(() => {
        if (token) {
            refetchUser();
        }
    }, [token, refetchUser]);

    if (!show) {
        return null
    }
    if (!token) {
        return <div>log in to view your recommendations</div>
    }
    if (userLoading) {
        return <div>Loading...</div>
    }

    if (userError || !userData || !userData.me) {
        return <div>Error loading user data.</div>
    }

    if (allBooksLoading || genreBooksLoading) {
        return <div>Loading...</div>
    }

    const books = selectedGenre === "all" ? allBooksData.allBooks : genreBooksData.allBooks

    // get all genres
    const genres = [...new Set(allBooksData.allBooks.flatMap(book => book.genres))]

    // const { data: userData, loading: userLoading, error: userError } = useQuery(ME)

    // const { loading: booksLoading, data: booksData , error: booksError} = useQuery(BOOKS_BY_GENRE, {
    //     variables: { genre: userData ? userData.me.favoriteGenre : null },
    //     skip: userLoading || !userData, 
    // })

    // if (!show) {
    //     return null
    // }
    // if (booksLoading || userLoading) return <div>Loading...</div>

    // const favoriteGenre = userData?.me?.favoriteGenre
    // console.log(favoriteGenre)
    // const books = booksData.allBooks 

    // useEffect(() => {
    //     if (userData && userData.me && booksData && booksData.allBooks) {
    //         const favoriteGenre = userData.me.favoriteGenre
    //         console.log(favoriteGenre)
    //         if (favoriteGenre) {
    //             // const booksByGenre = booksData.allBooks.filter((book) => book.genres.includes(favoriteGenre));
    //             const booksByGenre = genreBooksData.allBooks
    //             setFilteredBooks(booksByGenre);
    //         }
    //     }
    // }, [userData, booksData])

    // if (userLoading || booksLoading) return <div>Loading...</div>


    return (
        <div>
            <h2>Recommendations</h2>
            {books.length === 0 ? (
                <p>No books found for your favorite genre.</p>
            ) : (
                <div>
                    <p>Books in your favorite genre: <strong>{userData.me.favoriteGenre}</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Author</th>
                                <th>Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.title}>
                                    <td>{book.title}</td>
                                    <td>{book.author.name}</td>
                                    <td>{book.published}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default FavoriteBooks
