import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import axios from "axios";

import useLocalStorage from "./hooks/useLocalStorage";
import GlobalStyles from "./styles/GlobalStyles";

import Home from "./pages/Home";
import LikedPokemons from "./pages/LikedPokemons";

import Navbar from "./components/Navbar";

function App() {
  const [pokemonList, setPokemonList] = useState({});
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useLocalStorage("", "currentUser");
  const [likedPokemons, setLikedPokemons] = useState([]);

  async function unlikePokemon(pokemonName, id) {
    await axios
      .delete(
        `https://pokedex20201.herokuapp.com/users/${currentUser}/starred/${pokemonName}`
      )
      .then((response) => console.log(response));

    const newArray = likedPokemons.filter((pokemonId) => pokemonId !== id);
    setLikedPokemons(newArray);
  }

  async function likePokemon(pokemonName, id) {
    await axios.post(
      `https://pokedex20201.herokuapp.com/users/${currentUser}/starred/${pokemonName}`
    );

    const newArray = [...likedPokemons, id];
    setLikedPokemons(newArray);
  }

  useEffect(() => {
    const getDataUrl = `https://pokedex20201.herokuapp.com/users/${currentUser}`;

    async function getUserData() {
      const data = await axios.get(getDataUrl);

      setUserData(data.data);
      setLikedPokemons(data?.data?.pokemons?.map((pokemon) => pokemon.id));
    }
    getUserData();
  }, [likedPokemons]);

  useEffect(() => {
    setPokemonList({});

    const url = `https://pokedex20201.herokuapp.com/pokemons?page=${currentPage}`;
    async function getData() {
      const data = await axios.get(url);
      setPokemonList(data.data);
    }
    getData();

    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const registerUrl = "https://pokedex20201.herokuapp.com/users";
    const getDataUrl = `https://pokedex20201.herokuapp.com/users/${currentUser}`;

    async function registerUser() {
      await axios
        .post(registerUrl, {
          username: currentUser,
        })
        .then((response) => console.log(response));
    }

    async function getUserData() {
      const data = await axios.get(getDataUrl);

      setUserData(data.data);
      setLikedPokemons(data?.data?.pokemons?.map((pokemon) => pokemon.id));
    }

    if (currentUser) {
      registerUser();
      getUserData();
    }
  }, [currentUser]);

  return (
    <>
      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setUserData={setUserData}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              pokemonList={pokemonList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentUser={currentUser}
              likedPokemons={likedPokemons}
              unlikePokemon={unlikePokemon}
              likePokemon={likePokemon}
            />
          )}
        />
        {currentUser && (
          <Route
            exact
            path="/liked-pokemons"
            render={() => (
              <LikedPokemons
                pokemonList={pokemonList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                userData={userData}
                currentUser={currentUser}
                likedPokemons={likedPokemons}
                unlikePokemon={unlikePokemon}
                likePokemon={likePokemon}
              />
            )}
          />
        )}

        <Route exact render={() => <Redirect to="/" />} />
      </Switch>
      <GlobalStyles />
    </>
  );
}

export default App;
