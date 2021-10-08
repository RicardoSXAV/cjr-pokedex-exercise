import axios from 'axios'
import { useEffect, useState } from 'react';

import { Card } from "./components/Card";

function App() {
  const url = 'https://pokedex20201.herokuapp.com/pokemons?page=1'
  const [pokemonList, setPokemonList] = useState([])
  useEffect(() => {
    async function getData() {
      const data = await axios.get(url)
      setPokemonList(data.data.data)
    }

    getData()
  }, [])

  return (
    <>
    {
      pokemonList.map(pokemon => 
      <Card 
        key={pokemon.id}
        name={pokemon.name} 
        kind={pokemon.kind} 
        image_url={pokemon.image_url}  
      />
      )
    }
    </>
  );
}

export default App;


