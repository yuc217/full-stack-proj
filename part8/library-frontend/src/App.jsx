import { useQuery, useApolloClient } from '@apollo/client'
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import FavoriteBooks from './components/FavoriteBooks';

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("user-token"))
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("favorite")}>recommend</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
           
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <FavoriteBooks show={page === "favorite"} token={token} /> 
      <LoginForm show={page === "login" } setToken={setToken} />
    </div>
  );
};

export default App;
