import React from 'react';
import styled from 'styled-components'
import { colors } from '../constants/colors'
export function Card ({id, name, kind, image_url}) {
  const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    align-items: center;
    background-color: ${colors[kind.split(';')[0]]}; 
    color: black;
    border-radius: 8px;
    padding: 1rem;
    height: 12rem; 
    width: 12rem;
    `
  return (
    <Box>
    <h1>{name}</h1>
    <h2>{kind}</h2>
    <img src={image_url} alt="pokemon image" />
    </Box>
  )
}