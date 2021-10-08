import React from 'react';

export function Card ({id, name, kind, image_url}) {
  return (
    <>
    <h1>{name}</h1>
    <h2>{kind}</h2>
    <img src={image_url} alt="pokemon image" />
    </>
  )
}