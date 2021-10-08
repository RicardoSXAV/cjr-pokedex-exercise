import axios from 'axios'
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Card } from "./components/Card";
import Navbar from './components/Navbar';
import Pagination from './components/Pagination';
import GlobalStyles from './styles/globalStyles';

function App() {
  const [pokemonListData, setPokemonListData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    async function getData() {
      const data = await axios.get(url)
      setPokemonListData(data.data)

      console.log(pokemonListData.data)

    }
    const url = `https://pokedex20201.herokuapp.com/pokemons?page=${currentPage}`
    getData()
  }, [currentPage])

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-self: center;
  ` 
  return (
    
    <>
    <Navbar />
    <Container>

 
    {
      pokemonListData.data?.map(pokemon => 
      <Card 
        key={pokemon.id}
        name={pokemon.name} 
        kind={pokemon.kind} 
        image_url={pokemon.image_url}  
      />
      )
    }
       </Container>
    <Pagination
      totalPages={pokemonListData.size}
      currentPage={currentPage}
      setCurrentPage ={setCurrentPage}
    />
    <GlobalStyles />
    </>

  );
}

export default App;


