import React, { useState, useEffect } from 'react';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(respuesta => respuesta.json())
      .then(data => setPokemonList(data.results));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const getPokemonImageUrl = id => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container">
      <input
        type="text"
        placeholder="Buscar Pokémon"
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="pokemon-list">
        {filteredPokemon.map(pokemon => (
          <li key={pokemon.name} className="pokemon-item">
            <img
              src={getPokemonImageUrl(pokemon.url.split('/')[6])}
              className="pokemon-image"
            />
            <span className="pokemon-name">{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
