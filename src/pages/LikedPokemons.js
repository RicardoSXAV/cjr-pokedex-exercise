import React from "react";
import styled from "styled-components";

import Card from "../components/Card";
import Pagination from "../components/Pagination";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding-top: 8rem;
`;

const LoadingCard = styled.div`
  @keyframes loading {
    0% {
      filter: brightness(1.3);
    }
    100% {
      filter: brightness(1);
    }
  }

  height: 20rem;
  width: 18rem;
  margin: 2rem;
  padding: 1rem;

  background-color: #696969;
  border-radius: 25px;

  animation: loading 1s infinite 1s;
`;

export default function LikedPokemons({
  userData,
  likedPokemons,
  unlikePokemon,
  likePokemon,
  currentUser,
}) {
  const filteredPokemons = userData?.pokemons?.filter((pokemon) =>
    likedPokemons.includes(pokemon.id)
  );

  return (
    <>
      {JSON.stringify(userData.pokemons) !== undefined ? (
        <>
          <Container>
            {filteredPokemons?.map((pokemon) => (
              <Card
                id={pokemon.id}
                name={pokemon.name}
                kind={pokemon.kind}
                image_url={pokemon.image_url}
                liked={likedPokemons.includes(pokemon.id)}
                unlikePokemon={unlikePokemon}
                likePokemon={likePokemon}
                currentUser={currentUser}
              />
            ))}
          </Container>
        </>
      ) : (
        <Container>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </Container>
      )}
    </>
  );
}
