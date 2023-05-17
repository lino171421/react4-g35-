import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => setPokemonList(data.results));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPokemonImageUrl = id => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const rows = chunkArray(filteredPokemon, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input type="text" placeholder="Buscar Pokémon" onChange={handleSearch} style={{ marginBottom: '10px' }} />
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((pokemon) => (
            <div key={pokemon.name} style={{ marginRight: '10px', textAlign: 'center' }}>
              <img
                src={getPokemonImageUrl(pokemonList.indexOf(pokemon) + 1)}
                alt={pokemon.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              {pokemon.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
