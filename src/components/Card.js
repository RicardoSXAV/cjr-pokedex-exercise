import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { colors } from "../constants/colors";
import capitalizeString from "../helpers/capitalizeString";

import pokeballIcon from "../assets/pokeball-icon.png";

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 20rem;
  width: 18rem;
  margin: 2rem;
  padding: 1rem;

  background-color: ${(props) => colors[props.kind.split(";")[0]]};
  color: black;
  border-radius: 25px;
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);

  transition: all 0.3s ease-in-out;
  user-select: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  h1 {
    color: white;
  }

  .kind-line {
    display: flex;
    gap: 1rem;
  }

  .kind-wrapper {
    padding: 0.2rem 0.8rem;
    margin-bottom: 0.4rem;

    color: black;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.15) 93%
    );
    border-radius: 10px;

    h4 {
      opacity: 0.4;
    }
  }

  .pokemon-circle {
    padding: 1.5rem 2rem;
    border-radius: 50%;
    border: 3px solid white;
  }

  .pokemon-image {
    position: absolute;
    margin-top: 6rem;
    z-index: 1;
  }

  .pokeball-icon-background {
    position: absolute;
    margin-top: 3rem;
    opacity: 0.1;
    z-index: 0;
  }
`;

const IconDiv = styled.button`
  position: absolute;
  display: flex;
  padding: 1rem;
  font-size: 3rem;

  top: 80%;
  left: -10%;
  z-index: 2;

  color: red;
  background: linear-gradient(
    90deg,
    rgba(181, 203, 208, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 50%;
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);

  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }

  &:active {
    transition: all 0.1s ease-in-out;
    box-shadow: none;
    filter: brightness(0.8);
  }
`;

export default function Card({
  id,
  name,
  kind,
  image_url,
  liked,
  unlikePokemon,
  likePokemon,
  currentUser,
}) {
  const kindArray = kind.includes(";") ? kind.split(";") : [kind];

  return (
    <Box kind={kind}>
      {currentUser && (
        <IconDiv>
          {liked ? (
            <HiHeart
              className="heart"
              onClick={() => unlikePokemon(name, id)}
            />
          ) : (
            <HiOutlineHeart onClick={() => likePokemon(name, id)} />
          )}
        </IconDiv>
      )}
      <h1>{capitalizeString(name)}</h1>
      <div className="kind-line">
        {kindArray.map((kind) => (
          <div className="kind-wrapper">
            <h4>{capitalizeString(kind)}</h4>
          </div>
        ))}
      </div>

      <img src={image_url} alt={name} className="pokemon-image" />
      <img src={pokeballIcon} className="pokeball-icon-background" />
    </Box>
  );
}
